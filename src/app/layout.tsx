import React from "react"
import '../styles/globals.css';


interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="">
          {children}
        </div>
      </body>
    </html>
  )
}