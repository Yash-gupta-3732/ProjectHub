import { auth, signIn,signOut } from "../app/auth";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/asset/projectHub.png";
import React from "react";
import Form from "next/form";


const NavBar = async () => {
  const session = await auth();
  return (
    <header className="bg-white px-5 py-3 shadow-md">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" height={40} width={164} />
        </Link>

        {session && session?.user ? (
          <div className="flex justify-between gap-5">
            <Link href={"/"}>
              <span className="max-sm:hidden">Create</span>
            </Link>
           <Form
              action={async () => {
                "use server";
                await signOut({redirectTo: "/"});
              }}
            >
              <button
                type="submit"
                className="cursor-pointer"
              >
                Logout
              </button>
            </Form>
            <Link href={`/user/${session.user.id}`}>
              <span className="max-sm:hidden">{session.user?.name}</span>
            </Link>
          </div>
        ) : (
          <div>
            <Form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="cursor-pointer"
              >
                Login
              </button>
            </Form>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
