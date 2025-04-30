import Link from "next/link";

import {FiArrowRight, FiUsers, FiBook, FiBarChart2} from "react-icons/fi";

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col'>
      <header className='container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
          Student Management System
        </h1>
        <p className='text-xl text-gray-300 max-w-3xl mb-8'>
          A powerful platform to manage student information, courses, and
          academic progress with ease.
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Link
            href='/login'
            className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2'
          >
            Sign In
            <FiArrowRight />
          </Link>
        </div>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <h2 className='text-2xl md:text-3xl font-bold text-center text-white mb-12'>
          Powerful Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700'>
            <div className='w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4'>
              <FiUsers className='text-primary text-xl' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Student Management
            </h3>
            <p className='text-gray-300'>
              Easily add, edit, and manage student profiles with comprehensive
              information tracking.
            </p>
          </div>
          <div className='bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700'>
            <div className='w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mb-4'>
              <FiBook className='text-green-400 text-xl' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Course Tracking
            </h3>
            <p className='text-gray-300'>
              Manage course offerings, enrollments, and track academic progress
              efficiently.
            </p>
          </div>
          <div className='bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700'>
            <div className='w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4'>
              <FiBarChart2 className='text-purple-400 text-xl' />
            </div>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Performance Analytics
            </h3>
            <p className='text-gray-300'>
              Visualize student performance data and generate insightful reports
              for better decision making.
            </p>
          </div>
        </div>
      </main>

      <footer className='mt-auto border-t border-gray-700 py-8'>
        <div className='container mx-auto px-4 text-center text-gray-400 text-sm'>
          &copy; {new Date().getFullYear()} Student Management System. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
