import {NextResponse} from "next/server";
import {getStudents, getPaginatedStudents, createStudent} from "@/lib/db";

export async function GET(request: Request) {
  try {
    // Force a refresh from localStorage before processing the request
    console.log("API: Fetching students");
    
    const {searchParams} = new URL(request.url);
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string)
      : undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : undefined;
    const search = searchParams.get("search") || "";
    
    if (page !== undefined || limit !== undefined) {
      const result = getPaginatedStudents(page, limit, search);
      console.log(`API: Returning ${result.students?.length || 0} paginated students (total: ${result.total || 0})`);
      return NextResponse.json(result);
    }
    
    const students = getStudents();
    console.log(`API: Returning ${students?.length || 0} students`);
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      {error: "Failed to fetch students"},
      {status: 500},
    );
  }
}

export async function POST(request: Request) {
  try {
    const studentData = await request.json();
    const requiredFields = [
      "name",
      "email",
      "registrationNumber",
      "major",
      "dateOfBirth",
      "gpa",
    ];
    for (const field of requiredFields) {
      if (
        studentData[field] === undefined ||
        studentData[field] === null ||
        (typeof studentData[field] === "string" &&
          studentData[field].trim() === "")
      ) {
        return NextResponse.json(
          {error: `Missing required field: ${field}`},
          {status: 400},
        );
      }
    }
    if (!studentData.enrolledCourses) {
      studentData.enrolledCourses = [];
    }
    const newStudent = createStudent(studentData);
    return NextResponse.json(newStudent, {status: 201});
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({error: "Failed to add student"}, {status: 500});
  }
}
