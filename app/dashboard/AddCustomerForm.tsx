// AddCustomerForm.tsx
'use client'

import { createCustomer } from '@/lib/action';
import { useRef } from 'react';

export default function AddCustomerForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const result = await createCustomer(formData);
    if (result?.message) {
      alert(result.message);
      formRef.current?.reset();
    }
  };

  return (
    <section className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4">Add New Customer</h2>
      <form ref={formRef} action={clientAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name */}
          <input
            name="name"
            placeholder="Name"
            required
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Gender */}
          <select 
            name="gender" 
            required 
            className="border rounded-md p-2 w-full bg-white outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Age */}
          <input
            name="age"
            type="number"
            placeholder="Age (e.g. 25)"
            required
            min="1"
            className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* isMember Checkbox */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="isMember" 
              value="true" 
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
            />
            <span className="text-sm font-medium text-gray-700">Mark as Member</span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Add Customer
          </button>
        </div>
      </form>
    </section>
  );
}