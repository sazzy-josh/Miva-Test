"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {FiUsers, FiBookOpen, FiCalendar, FiTrendingUp} from "react-icons/fi";
import {getStudents, getCourses} from "@/lib/db";
import {Student, Course} from "@/types/student";
import StudentTable from "@/components/Tables/StudentTable";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({title, value, icon, change, trend}: StatCardProps) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-gray-500 dark:text-gray-400 font-medium'>
          {title}
        </h3>
        <div className='p-2 bg-primary/10 text-primary rounded-lg'>{icon}</div>
      </div>
      <div className='flex items-end justify-between'>
        <div>
          <p className='text-2xl font-bold'>{value}</p>
          {change && (
            <p
              className={`text-sm flex items-center mt-1 ${
                trend === "up"
                  ? "text-green-500"
                  : trend === "down"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {trend === "up" && <FiTrendingUp className='mr-1' />}
              {trend === "down" && (
                <FiTrendingUp className='mr-1 transform rotate-180' />
              )}
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setStudents(getStudents());
      setCourses(getCourses());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-120px)]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Welcome to your student management dashboard
          </p>
        </div>
        <div className='flex gap-2'>
          <Link
            href='/students/new'
            className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
          >
            Add Student
          </Link>
          <Link
            href='/courses/new'
            className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            Add Course
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          title='Total Students'
          value={students.length}
          icon={<FiUsers />}
          change='+12% from last month'
          trend='up'
        />
        <StatCard
          title='Total Courses'
          value={courses.length}
          icon={<FiBookOpen />}
          change='Same as last month'
          trend='neutral'
        />
        <StatCard
          title='Average GPA'
          value={(
            students.reduce((acc, student) => acc + student.gpa, 0) /
            students.length
          ).toFixed(2)}
          icon={<FiTrendingUp />}
          change='+0.2 from last semester'
          trend='up'
        />
        <StatCard
          title='Active Semesters'
          value='Spring 2025'
          icon={<FiCalendar />}
        />
      </div>

      {/* Recent Students */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-bold'>Recent Students</h2>
          <Link
            href='/students'
            className='text-primary text-sm hover:underline'
          >
            View All
          </Link>
        </div>

        <StudentTable
          students={students}
          limit={5}
          headers={[
            {text: "Name", value: "name"},
            {text: "Reg No", value: "registrationNumber"},
            {text: "Major", value: "major"},
            {text: "GPA", value: "gpa"},
            {text: "Courses", value: "enrolledCourses"},
          ]}
        />
      </div>

      {/* Recent Courses */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-bold'>Recent Courses</h2>
          <Link
            href='/courses'
            className='text-primary text-sm hover:underline'
          >
            View All
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className='border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow'
            >
              <div className='flex justify-between items-start'>
                <h3 className='font-medium'> {course.title} </h3>
                <span className='px-2 py-1 bg-primary/10 text-primary text-xs rounded-full'>
                  {course.credits} credits
                </span>
              </div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                {course.code}
              </p>
              <p className='text-sm mt-2 line-clamp-2'>{course.description}</p>
              <div className='mt-4 pt-4 border-t dark:border-gray-700 flex justify-between items-center'>
                <div className='text-sm'>
                  <p className='text-gray-500 dark:text-gray-400'>Instructor</p>
                  <p>{course.instructor}</p>
                </div>
                <Link
                  href={`/courses/${course.id}`}
                  className='text-primary text-sm hover:underline'
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
