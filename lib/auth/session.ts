'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE_NAME = 'admin_session'

export async function login(username: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Check if password is hashed (starts with $2a$ or $2b$ for bcrypt)
    const isHashed = admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$')

    let passwordMatches = false
    if (isHashed) {
      // Use bcrypt to compare hashed password
      passwordMatches = await bcrypt.compare(password, admin.password)
    } else {
      // Fallback to plain text comparison (for development/migration)
      passwordMatches = admin.password === password
    }

    if (!passwordMatches) {
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

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
