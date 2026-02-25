'use client' // This tells Next.js this code runs in the browser

import { deleteCustomer } from '@/lib/action';

export default function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    // 1. Call the server action
    const result = await deleteCustomer(id);
    
    // 2. Now alert() will work because this is a client component!
    if (result && result.message) {
      alert(result.message);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}