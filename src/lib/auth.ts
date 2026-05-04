import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-prod'
);

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'super_admin' | 'admin';
  name: string;
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getServerUser(): Promise<JWTPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('ravo_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getRequestUser(req: NextRequest): Promise<JWTPayload | null> {
  const token = req.cookies.get('ravo_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
