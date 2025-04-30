import { NextResponse } from 'next/server';
import { getStudents, createStudent } from '@/lib/db';

// GET /api/students - Fetch all students
export async function GET() {
  try {
    const students = getStudents();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST /api/students - Add a new student
export async function POST(request: Request) {
  try {
    const studentData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'registrationNumber', 'major', 'dateOfBirth', 'gpa'];
    for (const field of requiredFields) {
      if (!studentData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Add the student
    const newStudent = createStudent(studentData);
    
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: 'Failed to add student' },
      { status: 500 }
    );
  }
}
