// 代码生成时间: 2025-10-11 23:37:56
import { defineComponent, ref, onMounted } from 'vue';

// Interface for Exam
interface Exam {
  id: number;
  title: string;
  questions: Question[];
}

// Interface for Question
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

// Interface for ExamResult
interface ExamResult {
  examId: number;
  studentId: number;
  answers: { [key: string]: string };
  score: number;
}

// Service to handle exam logic
class ExamService {
  private exams: Exam[];

  constructor(exams: Exam[]) {
    this.exams = exams;
  }

  // Method to start an exam
  public async startExam(examId: number): Promise<Exam> {
    const exam = this.exams.find(e => e.id === examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    return exam;
  }

  // Method to submit exam results
  public async submitExamResult(examResult: ExamResult): Promise<ExamResult> {
    // Here you would add logic to save the exam result to a database
    // For demonstration purposes, we'll just return the examResult
    return examResult;
  }
}

// Component for Exam
const ExamComponent = defineComponent({
  name: 'ExamComponent',
  props: {
    examId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const examService = new ExamService([]); // In a real application, this would be initialized with actual exam data
    const exam = ref<Exam | null>(null);
    const examResult = ref<ExamResult>({
      examId: props.examId,
      studentId: 1, // Placeholder for student ID
      answers: {},
      score: 0
    });

    // Function to select an answer
    const selectAnswer = (questionId: number, answer: string) => {
      examResult.value.answers[questionId.toString()] = answer;
    };

    // Function to submit the exam
    const submitExam = async () => {
      try {
        examResult.value.score = 0;
        if (!exam.value) {
          throw new Error('Exam not started');
        }

        // Calculate the score based on correct answers
        exam.value.questions.forEach(question => {
          if (question.correctAnswer === examResult.value.answers[question.id.toString()]) {
            examResult.value.score += 1;
          }
        });

        // Submit the exam result to the service
        const result = await examService.submitExamResult(examResult.value);
        console.log('Exam submitted:', result);
      } catch (error) {
        console.error('Error submitting exam:', error);
      }
    };

    // Mount the exam component and load the exam
    onMounted(async () => {
      try {
        exam.value = await examService.startExam(props.examId);
      } catch (error) {
        console.error('Error starting exam:', error);
      }
    });

    return {
      exam,
      examResult,
      selectAnswer,
      submitExam
    };
  },
  template: `
    <div v-if="exam">
      <h1>{{ exam.title }}</h1>
      <div v-for="question in exam.questions" :key="question.id">
        <h2>{{ question.text }}</h2>
        <div v-for="(option, index) in question.options" :key="index">
          <button @click="selectAnswer(question.id, option)">{{ option }}</button>
        </div>
      </div>
      <button @click="submitExam">Submit Exam</button>
    </div>
  `
});

export default ExamComponent;