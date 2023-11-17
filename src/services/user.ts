import { apiUrl } from '@/constants/api';
import { httpGet } from '@/utils/request';

/**
 * 获取当前用户
 */
export async function queryCurrent() {
  return httpGet(`${apiUrl.dataCenter}/api/user/getCurrentUser`);
}

/**
 * 获取用户权限
 */
export async function queryUserPrivilege() {
  return httpGet(`${apiUrl.dataCenter}/api/user/getUserPrivilege`);
}

/**
 * 钉钉签名
 * @returns
 */
export async function dingTalkSign(url: string) {
  return httpGet(`${apiUrl.dataCenter}/api/dingTalk/sign?appName=omd&url=${url}`);
}

/**
 * 钉钉免登
 * @param code 校验码，调用钉钉接口获取
 * @returns
 */
export async function dingTalkAutoLogin(code: string) {
  return httpGet(`${apiUrl.dataCenter}/api/dingTalk/autoLogin?appName=omd&code=${code}`);
}

/**
 * 钉钉校验
 * @param code 校验码，调用钉钉接口获取
 * @returns
 */
export async function dingTalkAuth(params: any) {
  return httpGet(`${apiUrl.dataCenter}/api/dingTalk/auth?appName=omd`, params);
}
