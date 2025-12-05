import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentVault - 10,000 AI Agents for $20/month",
  description: "Stop paying per prompt. Get unlimited access to battle-tested AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}