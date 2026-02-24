import { prisma } from '@/lib/prisma';
import { customer } from '@prisma/client';

// Helper to parse "1,2,3" or "18-30" or "25"
const parseRangeOrList = (input: string | undefined) => {
  if (!input) return undefined;

  // Handle Range: "18-30"
  if (input.includes('-')) {
    const [min, max] = input.split('-').map(num => parseInt(num.trim()));
    return { gte: min, lte: max };
  }

  // Handle Multiple Values: "1, 2, 3"
  if (input.includes(',')) {
    return { in: input.split(',').map(num => parseInt(num.trim())).filter(n => !isNaN(n)) };
  }

  // Handle Single Value: "25"
  const val = parseInt(input);
  return isNaN(val) ? undefined : val;
};

export default async function FilterPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    id?: string; 
    email?: string; 
    gender?: string; 
    age?: string; 
    isMember?: string 
  }> 
}) {
  // 1. Await searchParams as required by Next.js 15+
  const params = await searchParams;

  // 2. Query the database using conditional filters
  const filteredCustomers = await prisma.customer.findMany({
    where: {
      id: parseRangeOrList(params.id), // Now supports 1 or 1,2,3 or 1-10
      email: params.email ? { contains: params.email } : undefined,
      gender: params.gender || undefined,
      age: parseRangeOrList(params.age), // Now supports 25 or 18-30
      // Map string 'true' from URL to actual boolean for MySQL tinyint
      isMember: params.isMember !== undefined ? params.isMember === 'true' : undefined,
    },
    orderBy: { id: 'asc' }
  });

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search Results ({filteredCustomers.length})</h1>
        <a href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</a>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <div className="p-10 border-2 border-dashed rounded-lg text-center">
          <p className="text-gray-500 text-lg">No customers found matching your criteria.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-700">ID</th>
                <th className="p-4 font-semibold text-gray-700">Name</th>
                <th className="p-4 font-semibold text-gray-700">Email</th>
                <th className="p-4 font-semibold text-gray-700">Gender</th>
                <th className="p-4 font-semibold text-gray-700">Age</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c: customer) => (
                <tr key={c.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm">{c.id}</td>
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4 capitalize">{c.gender}</td>
                  <td className="p-4">{c.age}</td>
                  {/* Handle the tinyint boolean display */}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${c.isMember ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {c.isMember ? 'Member' : 'Guest'}
                    </span>
                  </td>
                  {/* Format Date object to string to avoid ReactNode error */}
                  <td className="p-4 text-sm text-gray-500">
                    {c.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}