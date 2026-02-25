import { prisma } from '@/lib/prisma'

import { customer } from '@prisma/client'


import { Metadata } from 'next'
import AddCustomerForm from './AddCustomerForm'
import DashboardControls from './DashboardControls'
import DeleteButton from './DeleteButton'

// Add this metadata export
export const metadata: Metadata = {
  title: 'Dashboard', 
};

export default async function UsersPage() {
  const customers = await prisma.customer.findMany() // Direct DB Connection

  return (
 <main className="p-10 space-y-10">
      <h1 className="text-2xl font-bold">Customer Management</h1>
      <DashboardControls />
      {/* Form Section */}
      <section>
        <AddCustomerForm />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Existing Customers</h2>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">isMember</th>
              <th className="px-4 py-2 text-left">createdAt</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((user: customer) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">{user.isMember?'Yes' :'No'}</td>
                <td className="px-4 py-2">{user.createdAt.toISOString()}</td>
                <td className="px-4 py-2">
                  <DeleteButton id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}