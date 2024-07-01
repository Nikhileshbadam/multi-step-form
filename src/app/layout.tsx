// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
 import { SpeedInsights } from "@vercel/speed-insights/next";

// export default function RootLayout({ children }: RootLayoutProps) {
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster
              position="bottom-center"
              toastOptions={{
                custom: {
                  duration: 2000,
                },
              }}
            />
          </body>
        </html>
      </>
    );
  }

