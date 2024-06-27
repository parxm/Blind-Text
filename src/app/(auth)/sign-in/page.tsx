"use client";

import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="px-5 py-3 bg-blue-600 rounded-xl my-4d"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
