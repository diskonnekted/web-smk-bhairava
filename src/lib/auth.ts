import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type AuthSession = {
  userId: string;
  name: string;
  role: string;
  username?: string;
  expires?: Date;
}

const secretKey = process.env.JWT_SECRET || "nextschool-secret-key-bhairava-2026";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: AuthSession) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as AuthSession;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<AuthSession | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const sessionValue = request.cookies.get("session")?.value;
  if (!sessionValue) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(sessionValue);
  if (!parsed) return; // If session is invalid, don't update

  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
