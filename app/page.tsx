import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function UsersPage() {
  const users = await prisma.user.findMany() // Direct DB Connection

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">User Management</h1>
      {users.map(user => (
        <div key={user.id} className="border-b py-2">
          {user.name} - {user.email}
        </div>
      ))}
    </main>
  )
}