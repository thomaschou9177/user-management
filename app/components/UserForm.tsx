'use client'

import { createCustomer } from '../../lib/action'

export default function UserForm() {
  return (
    <form action={createCustomer} className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm border text-black">
      <h2 className="text-xl font-bold border-b pb-2">Register New Customer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Full Name</label>
          <input name="name" placeholder="John Doe" className="p-2 border rounded" required />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Email Address</label>
          <input name="email" type="email" placeholder="john@example.com" className="p-2 border rounded" required />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Gender</label>
          <select name="gender" className="p-2 border rounded bg-white" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Age Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Age</label>
          <input name="age" type="number" placeholder="25" className="p-2 border rounded" required />
        </div>
      </div>

      {/* Membership Toggle */}
      <div className="flex items-center gap-2 py-2">
        <input type="checkbox" name="isMember" id="isMember" className="w-4 h-4" />
        <label htmlFor="isMember" className="text-sm font-medium cursor-pointer">
          Apply for Membership
        </label>
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition"
      >
        Save Customer
      </button>
    </form>
  )
}