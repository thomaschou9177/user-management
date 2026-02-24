'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createCustomer(formData: FormData) {
  await prisma.customer.create({
    data: {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      age: parseInt(formData.get('age') as string),
      isMember: formData.get('isMember') === 'on',
    },
  })
  revalidatePath('/dashboard')
}

export async function deleteCustomer(id: number) {
  await prisma.customer.delete({
    where: { id },
  })
  revalidatePath('/dashboard')
}