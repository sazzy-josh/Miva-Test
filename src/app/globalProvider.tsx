import {SessionProvider} from "next-auth/react";
import {Provider} from "@/components/ui/provider";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider>
        <div className='min-h-screen bg-gray-900'>{children}</div>
      </Provider>
    </SessionProvider>
  );
}
