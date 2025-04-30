"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {FiArrowLeft, FiSave, FiX} from "react-icons/fi";
import {Student} from "@/types/student";
type FormData = Omit<Student, "id" | "avatar" | "enrolledCourses">;

export default function AddStudentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    registrationNumber: "",
    major: "",
    dateOfBirth: "",
    gpa: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required";
      isValid = false;
    }
    if (!formData.major.trim()) {
      newErrors.major = "Major is required";
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }
    if (formData.gpa < 0 || formData.gpa > 4.0) {
      newErrors.gpa = "GPA must be between 0 and 4.0";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const studentData = {
        ...formData,
        enrolledCourses: [],
      };
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error("Failed to create student");
      }
      router.push("/students");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create student. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Link
            href='/students'
            className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors'
          >
            <FiArrowLeft />
          </Link>
          <h1 className='text-2xl font-bold'>Add New Student</h1>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl shadow-sm overflow-hidden'>
        <form onSubmit={handleSubmit} className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-300 mb-1'
              >
                Name <span className='text-red-500'>*</span>
              </label>
              <input
                id='name'
                type='text'
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-300 mb-1'
              >
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor='registrationNumber'
                className='block text-sm font-medium text-gray-300 mb-1'
              >
                Registration Number <span className='text-red-500'>*</span>
              </label>
              <input
                id='registrationNumber'
                type='text'
                value={formData.registrationNumber}
                onChange={(e) =>
                  handleChange("registrationNumber", e.target.value)
                }
                className={`w-full px-3 py-2 border ${
                  errors.registrationNumber
                    ? "border-red-500"
                    : "border-gray-600"
                } rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.registrationNumber && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.registrationNumber}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='major'
                className='block text-sm font-medium text-gray-300 mb-1'
              >
                Major <span className='text-red-500'>*</span>
              </label>
              <select
                id='major'
                value={formData.major}
                onChange={(e) => handleChange("major", e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.major ? "border-red-500" : "border-gray-600"
                } rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary`}
              >
                <option value=''>Select a major</option>
                <option value='Computer Science'>Computer Science</option>
                <option value='Biology'>Biology</option>
                <option value='Business Administration'>
                  Business Administration
                </option>
                <option value='Psychology'>Psychology</option>
                <option value='Engineering'>Engineering</option>
                <option value='Mathematics'>Mathematics</option>
                <option value='Physics'>Physics</option>
                <option value='Chemistry'>Chemistry</option>
                <option value='Economics'>Economics</option>
                <option value='English'>English</option>
              </select>
              {errors.major && (
                <p className='mt-1 text-sm text-red-500'>{errors.major}</p>
              )}
            </div>
            <div>
              <label
                htmlFor='dateOfBirth'
                className='block text-sm font-medium text-gray-300 mb-1'
              >
                Date of Birth <span className='text-red-500'>*</span>
              </label>
              <input
                id='dateOfBirth'
                type='date'
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-600"
                } rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.dateOfBirth && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='gpa'
                className='block text-sm font-medium text-gray-300 mb-1'
              >
                GPA <span className='text-red-500'>*</span>
              </label>
              <input
                id='gpa'
                type='number'
                step='0.1'
                min='0'
                max='4.0'
                value={formData.gpa}
                onChange={(e) =>
                  handleChange("gpa", parseFloat(e.target.value) || 0)
                }
                className={`w-full px-3 py-2 border ${
                  errors.gpa ? "border-red-500" : "border-gray-600"
                } rounded-lg bg-gray-800 focus:ring-2 focus:ring-primary focus:border-primary`}
              />
              {errors.gpa && (
                <p className='mt-1 text-sm text-red-500'>{errors.gpa}</p>
              )}
            </div>
          </div>
          <div className='flex justify-end gap-3 mt-8'>
            <Link
              href='/students'
              className='px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2'
            >
              <FiX />
              Cancel
            </Link>
            <button
              type='submit'
              className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2'
              disabled={isSubmitting}
            >
              <FiSave />
              {isSubmitting ? "Saving..." : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
