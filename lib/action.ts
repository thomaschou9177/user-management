'use server'
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCustomer(formData: FormData) {
  // Extracting fields
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const gender = formData.get('gender') as string;
  const age = parseInt(formData.get('age') as string);
  
  // FIX: Check if the checkbox value exists. If it's checked, it will be "true".
  const isMember = formData.get('isMember') === 'true';
  try{
  await prisma.customer.create({
    data: {
      name,
        email,
        gender,
        age,
        isMember, // This will now correctly be true or false
    },
  })
  revalidatePath('/dashboard');
  return { message: 'Customer added successfully!' };
  } catch (error) {
    return { message: 'Error adding customer.' };
  }
}

export async function deleteCustomer(id: number) {
  try{
  await prisma.customer.delete({
    where: { id },
  })
  revalidatePath('/dashboard')
  // This is a valid object return in action.ts
    return { success: true, message: "Deleted successfully" }; 
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
}