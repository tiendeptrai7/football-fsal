import { EZaloEventTypes } from '@app/constant/app.enum';

export type ZaloHookPayload = {
  app_id: string;
  oa_id: string;
  user_id_by_app: string;
  sender: {
    id: string;
  };
  recipient: {
    id: string;
  };
  event_name: EZaloEventTypes;
  message: {
    msg_id: string;
    quote_msg_id?: string;
    text: string;
    attachments?: {
      payload: {
        thumbnail: string;
        description: string;
        title: string;
        url: string;
      };
      type: EZaloEventTypes;
    }[];
  };
  timestamp: string;
};
