'use client'
import { login } from '../lib/auth-actions';

export default function LoginClient() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={login} className="p-8 border rounded shadow-md w-96 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <input name="username" placeholder="Username" className="p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" className="p-2 border rounded" required />
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}