import { EFeedbackFormStatus } from '@app/constant/app.enum';

import { Feedback } from '../repository/entities/feedback.entity';

export interface FeedbackPublicListResponse {
  data: Feedback;
  status: EFeedbackFormStatus;
}
