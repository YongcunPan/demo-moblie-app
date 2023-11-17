import { CurrentUser, DingTalk, DingTalkSign } from '@/models/user';
import { Dispatch } from 'umi';

export interface SubAppLayoutProps {
  currentUser?: CurrentUser;
  dispatch: Dispatch;
  loading?: boolean;
  dingTalk?: DingTalk;
  dingTalkSign?: DingTalkSign;
}
