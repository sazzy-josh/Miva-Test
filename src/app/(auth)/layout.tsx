import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>{children}</div>
    </SessionProvider>
  );
}
