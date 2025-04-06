import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
        <div className="flex items-center justify-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link
                style={{ fontFamily: "var(--font-work-sans)", fontWeight: 400 }}
                href="/startup/create"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden text-blue-500" />
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
                    <span className="max-sm:hidden">Logout</span>
                    <LogOut className="size-6 sm:hidden text-red-600" />
                  </span>
                </button>
              </form>

              <Link
                style={{ fontFamily: "var(--font-work-sans)", fontWeight: 400 }}
                href={`/user/${session?.id}`}
              >
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
