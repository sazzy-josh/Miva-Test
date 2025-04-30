"use client";
import {Suspense} from "react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/Forms/LoginForm"), {
  ssr: false,
});

function LoginLoading() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 py-12 px-4'>
      <div className='w-full max-w-md py-8 px-8 bg-gray-800 shadow-lg rounded-lg'>
        <div className='flex justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
