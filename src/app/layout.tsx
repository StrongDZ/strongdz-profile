import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hoàng Khải Mạnh | Full-stack Developer",
    template: "%s | Hoàng Khải Mạnh",
  },
  description: "Full-stack Developer specializing in Web3, Data Engineering, and building scalable applications. Based in Hanoi, Vietnam.",
  keywords: ["Full-stack Developer", "Web3", "Data Engineering", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Hoàng Khải Mạnh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hoanmanh.dev",
    title: "Hoàng Khải Mạnh | Full-stack Developer",
    description: "Full-stack Developer specializing in Web3, Data Engineering, and building scalable applications.",
    siteName: "Hoàng Khải Mạnh Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${orbitron.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
