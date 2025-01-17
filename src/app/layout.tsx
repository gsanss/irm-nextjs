import React from 'react';
import { getServerSession } from 'next-auth/next'; // For authentication session
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // Adjust if needed
import './globals.css';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description'
};

export default async function RootLayout({
                                           children
                                         }: {
  children: React.ReactNode;
}) {
  // Fetch the current session on the server
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
    <body>
    <header>
      <nav>
        {session ? (
          <div>
            Welcome, {session.user?.name}
            <form action="/api/auth/signout" method="post">
              <button type="submit">Sign Out</button>
            </form>
          </div>
        ) : (
          <form action="/api/auth/signin" method="post">
            <button type="submit">Sign In</button>
          </form>
        )}
      </nav>
    </header>
    <main>{children}</main>
    </body>
    </html>
  );
}