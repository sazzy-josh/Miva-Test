import {getStudentById} from "@/lib/db";
import Link from "next/link";
import {FiArrowLeft} from "react-icons/fi";
import EditStudentForm from "@/components/Forms/EditStudentForm";

type Props = {
  params: { id: string };
};

export default function EditStudentPage({ params }: Props) {
  const student = getStudentById(params.id);

  if (!student) {
    return (
      <div className='bg-gray-800 rounded-xl shadow-sm p-6 text-center'>
        <h2 className='text-xl font-bold mb-4'>Error</h2>
        <p className='text-gray-400 mb-6'>Student not found</p>
        <Link
          href='/students'
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2'
        >
          <FiArrowLeft />
          Back to Students
        </Link>
      </div>
    );
  }

  return <EditStudentForm student={student} />;
}
