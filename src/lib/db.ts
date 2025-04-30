import {Student, Course} from "@/types/student";

// Mock student data
const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@university.edu",
    registrationNumber: "REG001",
    major: "Computer Science",
    dateOfBirth: "1998-05-15",
    gpa: 3.8,
    enrolledCourses: ["CS101", "CS201", "MATH101"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    registrationNumber: "REG002",
    major: "Biology",
    dateOfBirth: "1999-08-22",
    gpa: 3.9,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
    enrolledCourses: ["BIO101", "BIO201", "CHEM101"],
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@university.edu",
    registrationNumber: "REG003",
    major: "Business Administration",
    dateOfBirth: "1997-11-30",
    gpa: 3.5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    enrolledCourses: ["BUS101", "ECON101", "MKT201"],
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@university.edu",
    registrationNumber: "REG004",
    major: "Psychology",
    dateOfBirth: "1998-02-14",
    gpa: 3.7,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop",
    enrolledCourses: ["PSY101", "PSY201", "SOC101"],
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@university.edu",
    registrationNumber: "REG005",
    major: "Engineering",
    dateOfBirth: "1997-07-08",
    gpa: 3.6,
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250&auto=format&fit=crop",
    enrolledCourses: ["ENG101", "PHYS101", "MATH201"],
  },
];

// Mock course data
const courses: Course[] = [
  {
    id: "CS101",
    title: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. Alan Turing",
    description: "Fundamentals of computer science and programming concepts.",
    credits: 3,
    schedule: "Mon, Wed 10:00 - 11:30 AM",
    enrolledStudents: ["1"],
  },
  {
    id: "CS201",
    title: "Data Structures and Algorithms",
    code: "CS201",
    instructor: "Dr. Ada Lovelace",
    description:
      "Advanced programming concepts focusing on data structures and algorithms.",
    credits: 4,
    schedule: "Tue, Thu 1:00 - 2:30 PM",
    enrolledStudents: ["1"],
  },
  {
    id: "BIO101",
    title: "Introduction to Biology",
    code: "BIO101",
    instructor: "Dr. Charles Darwin",
    description: "Basic principles of biology and life sciences.",
    credits: 3,
    schedule: "Mon, Wed 1:00 - 2:30 PM",
    enrolledStudents: ["2"],
  },
  {
    id: "MATH101",
    title: "Calculus I",
    code: "MATH101",
    instructor: "Dr. Isaac Newton",
    description: "Introduction to differential and integral calculus.",
    credits: 4,
    schedule: "Mon, Wed, Fri 9:00 - 10:00 AM",
    enrolledStudents: ["1", "5"],
  },
  {
    id: "BUS101",
    title: "Introduction to Business",
    code: "BUS101",
    instructor: "Dr. Peter Drucker",
    description: "Overview of business principles and practices.",
    credits: 3,
    schedule: "Tue, Thu 10:00 - 11:30 AM",
    enrolledStudents: ["3"],
  },
];

// Helper function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Student CRUD operations
export const getStudents = (): Student[] => {
  return students;
};

export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const createStudent = (student: Omit<Student, "id">): Student => {
  const newStudent = {...student, id: generateId()};
  students.push(newStudent);
  return newStudent;
};

export const updateStudent = (
  id: string,
  updatedStudent: Partial<Student>,
): Student | undefined => {
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students[index] = {...students[index], ...updatedStudent};
    return students[index];
  }
  return undefined;
};

export const deleteStudent = (id: string): boolean => {
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    return true;
  }
  return false;
};

// Course CRUD operations
export const getCourses = (): Course[] => {
  return courses;
};
