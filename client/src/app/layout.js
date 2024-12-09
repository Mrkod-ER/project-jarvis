import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import './globals.css';

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
        <ClerkProvider>
          {children}
          </ClerkProvider>
        </body>
      </html>
  );
}
