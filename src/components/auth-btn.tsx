"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { SignOutButton } from "@/components/signOut-btn";

export function AuthButton() {
  const { data: session, status } = useSession();
  const [stableSession, setStableSession] = useState(session);

  useEffect(() => {
    // Only update stable session if we have a definitive authentication state
    if (status !== "loading") {
      setStableSession(session);
    }
  }, [session, status]);

  return (
    <div>
      {!stableSession ? <Link href="/login">Login</Link> : <SignOutButton />}
    </div>
  );
}
