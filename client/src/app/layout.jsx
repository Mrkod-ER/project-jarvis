import { ClerkProvider,ClerkLoaded,ClerkLoading, SignInButton } from '@clerk/nextjs';
import './globals.css';
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/navbar"


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      
            
          {/* <ClerkLoading>
          <div className='flex items-center justify-center w-screen h-screen'>
              loading....
            </div>
            </ClerkLoading> */}
          {/* <ClerkLoaded> */}
          {/* <div><Navbar/></div> */}
          {children}
          
          {/* </ClerkLoaded> */}
      </body>
    </html>
    </ClerkProvider>
  );
}