'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UserForm from '../components/UserForm'; // Ensure correct path

export default function DashboardControls() {
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    
    // Only add parameters to the URL if they have a value
    formData.forEach((value, key) => {
      if (value) params.set(key, value.toString())
    })
    
    router.push(`/dashboard/filter?${params.toString()}`)
  }

  return (
    <div className="mb-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Advanced Search</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          {showForm ? 'Close Form' : '+ Add Customer'}
        </button>
      </div>

      {showForm && <UserForm />}

      {/* NEW MULTI-FIELD SEARCH BAR */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg border">
        <input 
  name="id" 
  type="text" // Changed from 'number' to 'text' to allow hyphens and commas
  placeholder="ID (e.g. 1, 5-10)" 
  className="p-2 border rounded text-black" 
/>
        <input name="email" placeholder="Search Email..." className="p-2 border rounded text-black" />
        
        <select name="gender" className="p-2 border rounded bg-white text-black">
          <option value="">Any Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input 
  name="age" 
  type="text" // Changed from 'number' to 'text'
  placeholder="Age (e.g. 18-30)" 
  className="p-2 border rounded text-black" 
/>

        <select name="isMember" className="p-2 border rounded bg-white text-black">
          <option value="">Any Status</option>
          <option value="true">Members Only</option>
          <option value="false">Non-Members</option>
        </select>

        <button type="submit" className="lg:col-span-5 bg-gray-800 text-white p-2 rounded font-bold hover:bg-gray-700">
          Search with Filters
        </button>
      </form>
    </div>
  )
}