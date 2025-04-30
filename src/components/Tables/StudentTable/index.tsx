"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Student} from "@/types/student";

export interface TableHeader {
  text: string;
  value: string;
  align?: "left" | "right" | "center";
}

export interface StudentTableProps {
  students: Student[];
  headers: TableHeader[];
  limit?: number;
  showActions?: boolean;
  className?: string;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  headers,
  limit,
  showActions = false,
  className = "",
}) => {
  const displayStudents = limit ? students.slice(0, limit) : students;

  // Function to render cell content based on the header value
  const renderCell = (student: Student, header: TableHeader) => {
    switch (header.value) {
      case "name":
        return (
          <div className='flex items-center gap-3'>
            {student.avatar ? (
              <Image
                src={student.avatar}
                alt={student.name}
                width={45}
                height={45}
                className='rounded-full w-[45px] h-[45px] object-cover'
              />
            ) : (
              <div className='w-[45px] h-[45px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                <span className='text-xs font-medium'>
                  {student.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className='font-medium'>{student.name}</p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {student.email}
              </p>
            </div>
          </div>
        );
      case "registrationNumber":
        return (
          <span className='text-gray-500 dark:text-gray-400'>
            {student.registrationNumber}
          </span>
        );
      case "major":
        return student.major;
      case "gpa":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              student.gpa >= 3.5
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : student.gpa >= 3.0
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {student.gpa.toFixed(1)}
          </span>
        );
      case "enrolledCourses":
        return <span>{student.enrolledCourses?.length || 0} courses</span>;
      case "actions":
        return showActions ? (
          <div className='flex justify-end gap-2'>
            <Link
              href={`/students/${student.id}`}
              className='px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
            >
              View
            </Link>
            <Link
              href={`/students/${student.id}/edit`}
              className='px-3 py-1 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors'
            >
              Edit
            </Link>
          </div>
        ) : null;
      default:
        return student[header.value as keyof Student];
    }
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700'>
            {headers.map((header) => (
              <th
                key={header.value}
                className={`${
                  header.align === "right" ? "text-right" : "text-left"
                } py-3 px-4 font-medium text-gray-500 dark:text-gray-400`}
              >
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayStudents.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className='py-8 text-center text-gray-500 dark:text-gray-400'
              >
                No students found. Try adjusting your filters or add a new
                student.
              </td>
            </tr>
          ) : (
            displayStudents.map((student) => (
              <tr
                key={student.id}
                className='border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              >
                {headers.map((header) => (
                  <td
                    key={`${student.id}-${header.value}`}
                    className={`py-3 px-4 ${
                      header.align === "right" ? "text-right" : ""
                    }`}
                  >
                    {renderCell(student, header)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
