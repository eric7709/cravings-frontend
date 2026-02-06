import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/queryClient";
import CartProvider from "@/shared/provider/CartProvider";

// ✅ Import Poppins
const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Cravings - Restaurant Management",
  description: "Streamline your restaurant operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}  max-w-400 mx-auto antialiased`}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            {children}
          </CartProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
