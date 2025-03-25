"use client";

import * as actions from "@/actions";

export function SignInButton() {
  return (
    <button
      onClick={() => actions.signIn()}
      className="bg-amber-300 hover:underline cursor-pointer"
    >
      Sign in with GitHub
    </button>
  );
}
