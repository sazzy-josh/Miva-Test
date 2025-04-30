"use client";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {FiAlertTriangle} from "react-icons/fi";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      switch (errorParam) {
        case "CredentialsSignin":
          setError("Invalid email or password. Please try again.");
          break;
        case "OAuthAccountNotLinked":
          setError("This email is already associated with another account.");
          break;
        case "OAuthSignInError":
          setError("Error signing in with OAuth provider. Please try again.");
          break;
        case "OAuthCallback":
          setError("Error during OAuth callback. Please try again.");
          break;
        case "SessionRequired":
          setError("You must be signed in to access this page.");
          break;
        default:
          setError("An unknown error occurred. Please try again.");
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <div className='flex justify-center'>
            <FiAlertTriangle className='h-12 w-12 text-red-500' />
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            Authentication Error
          </h2>
          {error && (
            <p className='mt-2 text-center text-sm text-red-400'>{error}</p>
          )}
        </div>
        <div className='flex justify-center'>
          <Link
            href='/login'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
          >
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
}
