"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";

interface NextAuthProviderProps {
  children: ReactNode;
  session: any; // Pastikan session diterima sebagai prop
}

const NextAuthProvider: FC<NextAuthProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
