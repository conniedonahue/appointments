import Link from "next/link";
import { AuthButton } from "./auth-btn";

export default function Header() {
  return (
    <div className="w-full fixed top-0 z-10">
      <nav className="bg-orange-300 text-orange-50 container relative flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="text-3xl font-bold hover:opacity-8">
          Home
        </Link>
        <div className="mr-5 space-x-4 text-xl">
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/providers" className="hover:underline">
            Providers
          </Link>
          <AuthButton />
        </div>
      </nav>
    </div>
  );
}
