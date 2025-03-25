"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as auth from "@/auth";

export async function signOut() {
  try {
    // Clear server-side session
    await auth.signOut({ redirect: false });

    // Aggressive cache clearing
    revalidatePath("/", "layout");

    // Clear all cookies related to authentication
    const cookieStore = await cookies();
    const authCookies = cookieStore
      .getAll()
      .filter(
        (cookie) =>
          cookie.name.includes("next-auth") || cookie.name.includes("session")
      );

    authCookies.forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });

    // Optional: add a small delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    console.error("Server-side signOut error:", error);
  }
}
