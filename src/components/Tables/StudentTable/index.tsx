"use client";

import {useState, useEffect, useCallback} from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Shared/Pagination";
import {Student} from "@/types/student";
import debounce from "lodash/debounce";

export interface TableHeader {
  text: string;
  value: string;
  align?: "left" | "right" | "center";
}

export interface StudentTableProps {
  students?: Student[];
  headers: TableHeader[];
  limit?: number;
  showActions?: boolean;
  className?: string;
  pagination?: boolean;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  initialSearch?: string;
  useServerPagination?: boolean;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students: initialStudents = [],
  headers,
  limit,
  showActions = false,
  className = "",
  pagination = false,
  itemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 25, 50],
  initialSearch = "",
  useServerPagination = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [search, setSearch] = useState(initialSearch);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [totalItems, setTotalItems] = useState(initialStudents.length);
  const [, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(initialSearch);

  const fetchStudents = useCallback(async () => {
    if (!useServerPagination) return;

    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: perPage.toString(),
        search: search,
      });

      const response = await fetch(`/api/students?${queryParams}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();

      if (data.students) {
        setStudents(data.students);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      } else if (Array.isArray(data)) {
        setStudents(data);
        setTotalItems(data.length);
        setTotalPages(Math.ceil(data.length / perPage));
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, search, useServerPagination]);

  useEffect(() => {
    if (useServerPagination) {
      fetchStudents();
    }
  }, [fetchStudents, useServerPagination]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
      if (currentPage !== 1) setCurrentPage(1);
    }, 2000),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleItemsPerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  let displayStudents = students;

  if (!useServerPagination) {
    if (search) {
      const searchLower = search.toLowerCase();
      displayStudents = initialStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.registrationNumber.toLowerCase().includes(searchLower) ||
          student.major.toLowerCase().includes(searchLower),
      );

      // Update total items for pagination
      if (pagination) {
        setTotalItems(displayStudents.length);
      }
    } else {
      displayStudents = initialStudents;
      if (pagination) {
        setTotalItems(initialStudents.length);
      }
    }

    if (pagination && !useServerPagination) {
      const indexOfLastItem = currentPage * perPage;
      const indexOfFirstItem = indexOfLastItem - perPage;
      displayStudents = displayStudents?.slice(
        indexOfFirstItem,
        indexOfLastItem,
      );
    }

    if (limit) {
      displayStudents = displayStudents?.slice(0, limit);
    }
  }

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
              <div className='w-[45px] h-[45px] rounded-full bg-gray-700 flex items-center justify-center'>
                <span className='text-xs font-medium'>
                  {student.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className='font-medium'>{student.name}</p>
              <p className='text-sm text-gray-400'>{student.email}</p>
            </div>
          </div>
        );
      case "registrationNumber":
        return (
          <span className='text-gray-400'>{student.registrationNumber}</span>
        );
      case "major":
        return student.major;
      case "gpa":
        return (
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
        );
      case "enrolledCourses":
        return <span>{student.enrolledCourses?.length || 0} courses</span>;
      case "actions":
        return showActions ? (
          <div className='flex justify-end gap-2'>
            <Link
              href={`/students/${student.id}`}
              className='px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors'
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
      {(pagination || useServerPagination) && (
        <div className='p-4 flex items-center justify-between'>
          <div className='relative w-64'>
            <input
              type='text'
              placeholder='Search students...'
              value={inputValue}
              onChange={handleSearchChange}
              className='w-full px-3 py-2 pl-10 border border-gray-600 rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary'
            />
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center py-10'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary'></div>
        </div>
      ) : (
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-700/50 border-b border-gray-700'>
              {headers.map((header) => (
                <th
                  key={header.value}
                  className={`${
                    header.align === "right" ? "text-right" : "text-left"
                  } py-3 px-4 font-medium text-gray-400`}
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
                  className='py-8 text-center text-gray-400'
                >
                  No students found. Try adjusting your filters or add a new
                  student.
                </td>
              </tr>
            ) : (
              displayStudents.map((student) => (
                <tr
                  key={student.id}
                  className='border-b border-gray-700 hover:bg-gray-700/50'
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
      )}

      {(pagination || useServerPagination) && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={perPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={itemsPerPageOptions}
          showItemsPerPage={true}
        />
      )}
    </div>
  );
};

export default StudentTable;
