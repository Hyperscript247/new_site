'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const SESSION_COOKIE_NAME = 'admin_session'

export async function login(username: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin || admin.password !== password) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Create session cookie
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return { success: true, admin: { id: admin.id, username: admin.username } }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'An error occurred during logout' }
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionId) {
      return null
    }

    const admin = await prisma.admin.findUnique({
      where: { id: sessionId },
      select: { id: true, username: true },
    })

    return admin
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}
