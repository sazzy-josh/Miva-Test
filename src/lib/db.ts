import {Student, Course} from "@/types/student";

// Initialize with empty array, will be populated from localStorage on client
let students: Student[] = [];

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

// Initialize students from localStorage on client-side
if (typeof window !== "undefined") {
  try {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      students = JSON.parse(storedStudents);
      console.log("Loaded students from localStorage:", students.length);
    } else {
      localStorage.setItem("students", JSON.stringify(students));
      console.log("Initialized empty students array in localStorage");
    }
  } catch (error) {
    console.error("Error loading students from localStorage:", error);
  }
}

const saveToStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("students", JSON.stringify(students));
      console.log("Saved students to localStorage:", students.length);
    } catch (error) {
      console.error("Error saving students to localStorage:", error);
    }
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const getStudents = (): Student[] => {
  // Load the latest students from localStorage on client-side before returning
  if (typeof window !== "undefined") {
    try {
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        students = JSON.parse(storedStudents);
      }
    } catch (error) {
      console.error("Error loading students in getStudents:", error);
    }
  }
  return students;
};

export const getPaginatedStudents = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
): {students: Student[]; total: number; page: number; totalPages: number} => {
  // Load the latest students from localStorage on client-side before pagination
  if (typeof window !== "undefined") {
    try {
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        students = JSON.parse(storedStudents);
      }
    } catch (error) {
      console.error("Error loading students in getPaginatedStudents:", error);
    }
  }
  let filteredStudents = students;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.registrationNumber.toLowerCase().includes(searchLower) ||
        student.major.toLowerCase().includes(searchLower),
    );
  }

  const total = filteredStudents.length;
  const totalPages = Math.ceil(total / limit);
  const validPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (validPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);
  return {
    students: paginatedStudents,
    total,
    page: validPage,
    totalPages,
  };
};

export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const createStudent = (student: Omit<Student, "id">): Student => {
  // Load the latest students from localStorage on client-side before adding new student
  if (typeof window !== "undefined") {
    try {
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        students = JSON.parse(storedStudents);
      }
    } catch (error) {
      console.error("Error loading students before create:", error);
    }
  }

  const newStudent = {...student, id: generateId()};
  students.push(newStudent);
  saveToStorage();
  return newStudent;
};

export const updateStudent = (
  id: string,
  updatedStudent: Partial<Student>,
): Student | undefined => {
  // Load the latest students from localStorage on client-side before updating
  if (typeof window !== "undefined") {
    try {
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        students = JSON.parse(storedStudents);
      }
    } catch (error) {
      console.error("Error loading students before update:", error);
    }
  }

  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students[index] = {...students[index], ...updatedStudent};
    saveToStorage();
    return students[index];
  }
  return undefined;
};

export const deleteStudent = (id: string): boolean => {
  // Load the latest students from localStorage on client-side before deleting
  if (typeof window !== "undefined") {
    try {
      const storedStudents = localStorage.getItem("students");
      if (storedStudents) {
        students = JSON.parse(storedStudents);
      }
    } catch (error) {
      console.error("Error loading students before delete:", error);
    }
  }

  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    saveToStorage();
    return true;
  }
  return false;
};

export const getCourses = (): Course[] => {
  return courses;
};
