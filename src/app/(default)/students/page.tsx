"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {FiPlus, FiFilter, FiChevronDown} from "react-icons/fi";
import {Student} from "@/types/student";
import StudentTable from "@/components/Tables/StudentTable";

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filterMajor, setFilterMajor] = useState("");
  const [uniqueMajors, setUniqueMajors] = useState<string[]>([]);

  // Fetch unique majors for the filter dropdown
  const fetchMajors = async () => {
    setIsLoading(true);
    try {
      // Force refresh from localStorage first
      if (typeof window !== "undefined") {
        const storedStudents = localStorage.getItem("students");
        console.log("Checking localStorage for students:", storedStudents ? JSON.parse(storedStudents).length : 0);
      }

      const response = await fetch("/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      console.log("Fetched students from API:", data.length || 0);

      // If we have students, extract majors
      if (Array.isArray(data)) {
        const majors = Array.from(
          new Set(data.map((student: Student) => student.major)),
        ).filter(Boolean) as string[];
        setUniqueMajors(majors);
      } else if (data.students && Array.isArray(data.students)) {
        const majors = Array.from(
          new Set(data.students.map((student: Student) => student.major)),
        ).filter(Boolean) as string[];
        setUniqueMajors(majors);
      } else {
        setUniqueMajors([]);
      }
    } catch (error) {
      console.error("Error fetching majors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchMajors();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
          <h1 className='text-2xl font-bold'>Students</h1>
          <p className='text-gray-400'>Manage student records</p>
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
      <div className='bg-gray-800 rounded-xl shadow-sm p-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative flex-1'>
            {/* Search is now handled directly in the StudentTable component */}
          </div>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiFilter className='text-gray-400' />
            </div>
            <select
              className='pl-10 pr-8 py-2 border border-gray-700 rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary appearance-none'
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
      <div className='bg-gray-800 rounded-xl shadow-sm overflow-hidden'>
        <StudentTable
          headers={[
            {text: "Name", value: "name"},
            {text: "Reg No", value: "registrationNumber"},
            {text: "Major", value: "major"},
            {text: "GPA", value: "gpa"},
            {text: "Courses", value: "enrolledCourses"},
            {text: "Actions", value: "actions", align: "right"},
          ]}
          showActions={true}
          useServerPagination={true}
          itemsPerPage={5}
          initialSearch=''
        />
      </div>
    </div>
  );
}
