import { apiUrl } from '@/constants/api';
import { httpPost } from '@/utils/request';

/**
 * 登录
 */
export async function login(data: any) {
  return httpPost(`${apiUrl.dataCenter}/api/sso/login`, data);
}
