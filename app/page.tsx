import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
export default async function UsersPage() {
  const users = await prisma.user.findMany() // Direct DB Connection

  return (
    <table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-100 border-b">
      <th className="px-4 py-2 text-left">ID</th>
      <th className="px-4 py-2 text-left">Name</th>
      <th className="px-4 py-2 text-left">Email</th>
      <th className="px-4 py-2 text-left">Role</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user: User) => (
      <tr key={user.id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-2">{user.id}</td>
        <td className="px-4 py-2">{user.name}</td>
        <td className="px-4 py-2">{user.email}</td>
        <td className="px-4 py-2">{user.role}</td>
      </tr>
    ))}
  </tbody>
</table>
  )
}