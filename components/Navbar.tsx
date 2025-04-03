import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="bg-white shadow-sm px-6 py-4 font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          style={{ fontFamily: "var(--font-work-sans)", fontWeight: 500 }}
          className="text-xl font-bold text-gray-800"
        >
          LaunchPad 🚀
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link
                style={{ fontFamily: "var(--font-work-sans)", fontWeight: 400 }}
                href="/startup/create"
                className=""
              >
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span
                    style={{
                      fontFamily: "var(--font-work-sans)",
                      fontWeight: 400,
                    }}
                  >
                    Logout
                  </span>
                </button>
              </form>

              <Link
                style={{ fontFamily: "var(--font-work-sans)", fontWeight: 400 }}
                href={`/user/${session?.id}`}
              >
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                style={{ fontFamily: "var(--font-work-sans)", fontWeight: 400 }}
                type="submit"
              >
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
