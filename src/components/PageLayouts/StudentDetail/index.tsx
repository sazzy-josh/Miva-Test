"use client";

import Link from "next/link";
import Image from "next/image";
import {FiArrowLeft, FiCalendar, FiMail, FiBook} from "react-icons/fi";
import {Course, Student} from "@/types/student";
import StudentActions from "@/components/Actions/StudentActions";
import {useEffect, useState} from "react";

interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetail({studentId}: StudentDetailProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/students/${studentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
        // In a real app, we would fetch enrolled courses here
        setCourses(data.enrolledCourses || []);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to load student data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-120px)]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className='bg-gray-800 rounded-xl shadow-sm p-6 text-center'>
        <h2 className='text-xl font-bold mb-4'>Student Not Found</h2>
        <p className='text-gray-400 mb-6'>
          The student you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href='/students'
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2'
        >
          <FiArrowLeft />
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Link
            href='/students'
            className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors'
          >
            <FiArrowLeft />
          </Link>
          <h1 className='text-2xl font-bold'>Student Details</h1>
        </div>

        <StudentActions
          studentId={studentId}
          studentName={student?.name || ""}
        />
      </div>

      <div className='bg-gray-800 rounded-xl shadow-sm overflow-hidden'>
        <div className='p-6 md:p-8'>
          <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
            <div className='flex-shrink-0'>
              {student.avatar ? (
                <Image
                  src={student.avatar}
                  alt={student.name}
                  width={150}
                  height={150}
                  className='rounded-lg object-cover'
                />
              ) : (
                <div className='w-[150px] h-[150px] rounded-lg bg-gray-700 flex items-center justify-center'>
                  <span className='text-4xl font-medium'>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>
            <div className='flex-1'>
              <h2 className='text-2xl font-bold mb-2'>{student.name}</h2>
              <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4'>
                <FiMail />
                <span>{student.email}</span>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                <div>
                  <p className='text-sm text-gray-400 mb-1'>
                    Registration Number
                  </p>
                  <p className='font-medium'>{student.registrationNumber}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-400 mb-1'>Major</p>
                  <p className='font-medium'>{student.major}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-400 mb-1'>Date of Birth</p>
                  <div className='flex items-center gap-2'>
                    <FiCalendar className='text-gray-400' />
                    <p className='font-medium'>
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-gray-400 mb-1'>GPA</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.gpa >= 3.5
                        ? "bg-green-900/30 text-green-400"
                        : student.gpa >= 3.0
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-yellow-900/30 text-yellow-400"
                    }`}
                  >
                    {student.gpa.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl shadow-sm p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <FiBook className='text-primary' />
            <h2 className='text-lg font-bold'>Enrolled Courses</h2>
          </div>
          <span className='px-2 py-1 bg-gray-700 rounded-full text-sm'>
            {courses.length} courses
          </span>
        </div>

        {courses.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-400 mb-4'>
              This student is not enrolled in any courses yet.
            </p>
            <Link
              href='/courses'
              className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2'
            >
              <FiBook />
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {courses.map((course) => (
              <div
                key={course.id}
                className='border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <div className='flex justify-between items-start'>
                  <h3 className='font-medium'>{course.title}</h3>
                  <span className='px-2 py-1 bg-primary/10 text-primary text-xs rounded-full'>
                    {course.credits} credits
                  </span>
                </div>
                <p className='text-sm text-gray-400 mt-2'>{course.code}</p>
                <p className='text-sm mt-2 line-clamp-2'>
                  {course.description}
                </p>
                <div className='mt-4 pt-4 border-t border-gray-700 flex justify-between items-center'>
                  <div className='text-sm'>
                    <p className='text-gray-400'>Instructor</p>
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
        )}
      </div>
    </div>
  );
}
