"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the AuthError component with no SSR to avoid hydration issues
const AuthError = dynamic(() => import("@/components/Error/AuthError"), {
  ssr: false,
});

// Loading fallback
function ErrorLoading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='flex justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<ErrorLoading />}>
      <AuthError />
    </Suspense>
  );
}
