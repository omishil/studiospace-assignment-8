import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/theme-provider";
import WishlistProvider from "@/components/wishlist-provider";
import AppToaster from "@/components/app-toaster";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "StudioSpace",
  description: "Find and explore creative studios",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full font-[var(--font-poppins)]">
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            {children} <AppToaster />

            <Footer></Footer>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}