import { auth } from "@/auth";
import { SignInButton } from "@/components/signIn-btn";
import Image from "next/image";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <h1>{session.user.name} is signed in</h1>

        {session.user.image && (
          <Image
            src={session.user.image}
            alt="GitHub profile image"
            width={48}
            height={48}
            className="border rounded-full"
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <p>You are not signed in</p>
      <SignInButton />
    </div>
  );
}
