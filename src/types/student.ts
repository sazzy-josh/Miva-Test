export interface Student {
  id: string;
  name: string;
  email: string;
  registrationNumber: string;
  major: string;
  dateOfBirth: string;
  gpa: number;
  avatar?: string;
  enrolledCourses?: string[];
}

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  description: string;
  credits: number;
  schedule?: string;
  enrolledStudents?: string[];
}
