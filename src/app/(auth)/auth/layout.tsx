import React from "react";
import "../../globals.css";
import { Epilogue } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const session = await getServerSession(authOptions);
	  
	if (session !== null) {
		return redirect("/");
	}

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
          <main>
              {children}
          </main>
      </body>
    </html>
  );
}