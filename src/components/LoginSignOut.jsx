import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // Adjust the path if necessary
import { signIn, signOut } from "next-auth/react";

export default async function LoginSignOut() {
  const session = await getServerSession(authOptions); // Fetch session data on the server

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <form action="/api/auth/signout" method="post">
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      Not signed in <br />
      <form action="/api/auth/signin" method="post">
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}