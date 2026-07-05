import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vishwa Wijekoon — Backend Engineer",
  description:
    "Spring Boot microservices, distributed systems, and full-stack engineering. 3rd-year SE undergrad at SLIIT, Sri Lanka.",
  keywords: [
    "software engineer",
    "backend",
    "Spring Boot",
    "microservices",
    "distributed systems",
    "Docker",
    "Kafka",
    "portfolio",
  ],
  authors: [{ name: "Vishwa Wijekoon" }],
  openGraph: {
    title: "Vishwa Wijekoon — Backend Engineer",
    description:
      "Spring Boot microservices, distributed systems, and full-stack engineering.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
