import { EGender, EQuestionType, EStatus } from '@app/constant/app.enum';
import { Submission } from '@modules/form-question/repository/entities/submission.entity';

export interface OverviewResponse {
  total_completed: number;
  total_uncompleted: number;
}

export interface DetailResponse {
  question_type: EQuestionType;
  question_content: string;
  question_id: number;
}

export interface BarChartResponse {
  categories: string[];
  data: string[];
}

export interface LineChartResponse extends BarChartResponse {}

export interface MultiChoiceData {
  question_id: number;
  answer_id: number;
  total: number;
}

export interface ShortAnswerResponse {
  answer_text: string;
}

export interface ReportSurveyResponse {
  participant: Participant;
  survey_result?: Submission[];
}

export interface Participant {
  full_name: string;
  specialty: string;
  date_of_birth?: string;
  hco: string;
  gender: EGender;
  survey_status: EStatus;
  zalo_number: string;
  time_of_submission: Date;
}
