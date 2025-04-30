"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {FiSearch, FiPlus, FiFilter, FiChevronDown} from "react-icons/fi";
import {getStudents} from "@/lib/db";
import {Student} from "@/types/student";
import StudentTable from "@/components/Tables/StudentTable";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMajor, setFilterMajor] = useState("");

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      const fetchedStudents = getStudents();
      setStudents(fetchedStudents);
      setFilteredStudents(fetchedStudents);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...students];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.registrationNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply major filter
    if (filterMajor) {
      result = result.filter((student) => student.major === filterMajor);
    }

    setFilteredStudents(result);
  }, [students, searchQuery, filterMajor]);

  const uniqueMajors = Array.from(
    new Set(students.map((student) => student.major)),
  );

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
          <h1 className='text-2xl font-bold'>Students</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            Manage student records
          </p>
        </div>
        <Link
          href='/students/new'
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2'
        >
          <FiPlus />
          Add Student
        </Link>
      </div>

      {/* Filters */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative flex-1'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiSearch className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search students...'
              className='pl-10 pr-4 py-2 w-full border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiFilter className='text-gray-400' />
            </div>
            <select
              className='pl-10 pr-8 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary appearance-none'
              value={filterMajor}
              onChange={(e) => setFilterMajor(e.target.value)}
            >
              <option value=''>All Majors</option>
              {uniqueMajors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <FiChevronDown className='text-gray-400' />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden'>
        <StudentTable
          students={filteredStudents}
          headers={[
            {text: "Name", value: "name"},
            {text: "Reg No", value: "registrationNumber"},
            {text: "Major", value: "major"},
            {text: "GPA", value: "gpa"},
            {text: "Courses", value: "enrolledCourses"},
            {text: "Actions", value: "actions", align: "right"},
          ]}
          showActions={true}
        />
      </div>
    </div>
  );
}
