'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
interface StudentActionsProps {
  studentId: string;
  studentName: string;
}
export default function StudentActions({ studentId, studentName }: StudentActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      setShowDeleteModal(false);
      router.push('/students');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <div className='flex gap-2'>
        <Link
          href={`/students/${studentId}/edit`}
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2'
        >
          <FiEdit2 />
          Edit
        </Link>
        <button
          onClick={() => setShowDeleteModal(true)}
          className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2'
        >
          <FiTrash2 />
          Delete
        </button>
      </div>
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-gray-800 rounded-xl p-6 max-w-md w-full'>
            <h3 className='text-xl font-bold mb-4'>Delete Student</h3>
            <p className='mb-6'>
              Are you sure you want to delete {studentName}? This action cannot
              be undone.
            </p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors'
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2'
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
