"use client";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {FiMail, FiAlertCircle, FiEye, FiEyeOff} from "react-icons/fi";
import {IoKeySharp} from "react-icons/io5";
import Image from "next/image";
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }
      router.push(callbackUrl);
    } catch (error: unknown) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      console.error(error);
    }
  };
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 py-12 px-4'>
      <div className='mb-8'>
        <Image
          src='https://miva-university.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/05/15101916/miva-mobile-logo.png'
          width={100}
          height={100}
          alt='Miva Logo'
          priority
        />
      </div>
      <div className='w-full max-w-md py-8 px-8 bg-gray-800 shadow-lg rounded-lg'>
        <div className='space-y-6'>
          <div className='flex flex-col items-center space-y-2'>
            <h2 className='text-2xl font-bold text-center text-white'>
              Sign in to your account
            </h2>
            <p className='text-sm text-gray-400 text-center'>
              Student Management System
            </p>
          </div>
          {error && (
            <div className='flex items-center bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md'>
              <FiAlertCircle className='text-red-400 mr-2' />
              <p className='text-sm text-red-400'>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div>
                <label htmlFor='email' className='sr-only'>
                  Email address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiMail className='text-gray-400' />
                  </div>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email address'
                    autoComplete='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full pl-10 pr-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <IoKeySharp className='text-gray-400' />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name='password'
                    placeholder='Password'
                    autoComplete='current-password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full pl-10 pr-10 py-2 border border-gray-600 bg-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
                  />
                  <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none'
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between pt-2'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-400'
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href='#'
                  className='text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type='submit'
                disabled={isLoading}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4'
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
              <p className='text-sm text-center font-medium text-gray-600 dark:text-gray-400 mt-4'>
                * Demo credentials:{" "}
                <span className='font-bold'>
                  admin@example.com / password@123
                </span>{" "}
                *
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
