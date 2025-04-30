"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import EditStudentForm from "@/components/Forms/EditStudentForm";
import { Student } from "@/types/student";

type Props = {
  params: { id: string };
};

export default function EditStudentPage({ params }: Props) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch(`/api/students/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student');
        }
        const data = await response.json();
        setStudent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchStudent();
  }, [params.id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-200px)]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className='bg-gray-800 rounded-xl shadow-sm p-6 text-center'>
        <h2 className='text-xl font-bold mb-4'>Error</h2>
        <p className='text-gray-400 mb-6'>Student not found</p>
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

  return <EditStudentForm student={student} />;
}
