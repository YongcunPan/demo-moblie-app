import { CurrentUser, DingTalk } from '@/models/user';
import { Dispatch } from 'umi';

export type HomePageProps = {
  dingTalk?: DingTalk;
  currentUser?: CurrentUser;
  dispatch: Dispatch;
};
