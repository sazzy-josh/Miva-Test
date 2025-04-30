'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit2, FiTrash2, FiArrowLeft, FiCalendar, FiMail, FiBook } from 'react-icons/fi';
import { Student, Course } from '@/types/student';

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch student data from API
        const response = await fetch(`/api/students/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch student');
        }
        
        const fetchedStudent = await response.json();
        setStudent(fetchedStudent);
        
        // For now, we'll use the enrolled courses from the student data
        // In a real application, we would fetch course details from a courses API
        if (fetchedStudent.enrolledCourses && fetchedStudent.enrolledCourses.length > 0) {
          // This is a placeholder - in a real app, we would fetch course details
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudentData();
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      // Call the API to delete the student
      const response = await fetch(`/api/students/${params.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete student');
      }
      
      // Close the modal and redirect to students list
      setShowDeleteModal(false);
      router.push('/students');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Student Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The student you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/students" 
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <FiArrowLeft />
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/students" 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FiArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Student Details</h1>
        </div>
        <div className="flex gap-2">
          <Link 
            href={`/students/${params.id}/edit`} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <FiEdit2 />
            Edit
          </Link>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      {/* Student Profile */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-shrink-0">
              {student.avatar ? (
                <Image 
                  src={student.avatar} 
                  alt={student.name} 
                  width={150} 
                  height={150} 
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-[150px] h-[150px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl font-medium">{student.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{student.name}</h2>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                <FiMail />
                <span>{student.email}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Registration Number</h3>
                  <p className="font-medium">{student.registrationNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Major</h3>
                  <p className="font-medium">{student.major}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</h3>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" />
                    <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">GPA</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.gpa >= 3.5 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    student.gpa >= 3.0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {student.gpa.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiBook className="text-primary" />
            <h2 className="text-lg font-bold">Enrolled Courses</h2>
          </div>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
            {courses.length} courses
          </span>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">This student is not enrolled in any courses yet.</p>
            <Link 
              href="/courses" 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <FiBook />
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{course.title}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {course.credits} credits
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{course.code}</p>
                <p className="text-sm mt-2 line-clamp-2">{course.description}</p>
                <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-between items-center">
                  <div className="text-sm">
                    <p className="text-gray-500 dark:text-gray-400">Instructor</p>
                    <p>{course.instructor}</p>
                  </div>
                  <Link href={`/courses/${course.id}`} className="text-primary text-sm hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Student</h3>
            <p className="mb-6">Are you sure you want to delete {student.name}? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
