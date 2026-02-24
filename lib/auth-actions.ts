'use server'
import { redirect } from 'next/navigation'

// For a simple project, you can hardcode the 3 accounts
const VALID_ACCOUNTS = [
  { user: 'admin1', pass: '1234' },
  { user: 'admin2', pass: '5678' },
  { user: 'admin3', pass: 'abcd' }
]

export async function login(formData: FormData) {
  const user = formData.get('username')
  const pass = formData.get('password')

  const isValid = VALID_ACCOUNTS.find(acc => acc.user === user && acc.pass === pass)

  if (isValid) {
    // If successful, go to the customer management page
    redirect('/dashboard')
  } else {
    // If failed, you could throw an error or redirect back
    redirect('/?error=invalid')
  }
}