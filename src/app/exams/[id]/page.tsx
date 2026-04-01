import { exams, questions } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import ExamSimulator from "./ExamSimulator";

export async function generateStaticParams() {
  return exams.map((exam) => ({
    id: String(exam.id),
  }));
}

export default async function ExamSimulationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const exam = exams.find((e) => e.id === Number(id));

  if (!exam) {
    return (
      <>
        <Sidebar />
        <div className="page-container">
          <div className="card p-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Exam Not Found
            </h2>
            <p className="text-sm text-gray-500">
              The exam you&apos;re looking for does not exist.
            </p>
          </div>
        </div>
      </>
    );
  }

  const examQuestions = questions.slice(0, exam.questionCount);

  return (
    <>
      <Sidebar />
      <div className="page-container">
        <ExamSimulator exam={exam} examQuestions={examQuestions} />
      </div>
    </>
  );
}
