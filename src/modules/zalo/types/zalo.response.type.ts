export type ZaloMessageResponse = {
  error: number;
  message: string;
  data: {
    quota: {
      quota_type: string;
      remain: number;
      total: number;
    };
    message_id: string;
    user_id: string;
  };
};

export interface ZaloUserResponse {
  user_id: string;
  user_id_by_app: string;
  display_name: string;
  avatar: string;
  user_alias: string;
  user_is_follower: boolean;
  user_last_interaction_date: string | Date;
}

export type ZaloZNSResponse = {
  error: number;
  message: string;
  data: {
    msg_id: string;
    sent_time: string;
    sending_mode: string;
    quota: {
      dailyQuota: string;
      remainingQuota: number;
    };
  };
};

export type ZaloOfficialAccountResponse = {
  oaid: string;
  name: string;
  description: string;
  oa_alias: string;
  is_verified: boolean;
  oa_type: number;
  cate_name: string;
  num_follower: number;
  avatar: string;
  cover: string;
  package_name: string;
  package_valid_through_date: string;
  package_auto_renew_date: string;
  linked_ZCA: string;
};

export type zaloResponse<T> = {
  data: T;
  error: number;
  message: string;
};
