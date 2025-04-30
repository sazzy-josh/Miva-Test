import { NextResponse } from 'next/server';
import { getStudentById, updateStudent, deleteStudent } from '@/lib/db';
export function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const student = getStudentById(params.id);
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(student);
  } catch (error) {
    console.error(`Error fetching student ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const studentData = await request.json();
    const updatedStudent = updateStudent(params.id, studentData);
    if (!updatedStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error(`Error updating student ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    );
  }
}
export function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteStudent(params.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting student ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
