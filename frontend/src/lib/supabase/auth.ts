'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

// ----------------------
// Google Login
// ----------------------
export async function loginWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  })

  if (error) {
    redirect('/error')
  }

  redirect(data.url)
}

// ----------------------
// GitHub Login
// ----------------------
export async function loginWithGithub() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  })

  if (error) {
    redirect('/error')
  }

  redirect(data.url)
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error;
  }

  return { success: true };
}