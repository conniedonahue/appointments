import * as actions from "@/actions";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useState } from "react";

// Define the props interface
interface SignOutButtonProps {
  onSignOut?: () => void;
}

export function SignOutButton({ onSignOut }: SignOutButtonProps) {
  const { update } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignout = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    // Call the onSignOut callback if provided
    onSignOut?.();

    try {
      // Multiple sign-out strategies
      await actions.signOut();
      await nextAuthSignOut({ redirect: false });

      // Force session update through multiple methods
      await update(null);

      // Clear any potential client-side storage
      localStorage.removeItem("session");

      // Hard navigation and refresh
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
      // Fallback to hard redirect if all else fails
      window.location.href = "/";
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <button
      onClick={handleSignout}
      disabled={isSigningOut}
      className="hover:underline cursor-pointer"
    >
      {isSigningOut ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
