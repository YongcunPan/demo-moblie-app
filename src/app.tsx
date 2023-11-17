import { RequestConfig, history } from 'umi';
import { restCode, RestResponse } from './constants/rest';
import { alertUtil, messageUtil } from './utils/message';
import { getToken } from './utils/request';

/**
 * 请求运行时配置
 */
export const request: RequestConfig = {
  timeout: 30000,
  errorConfig: {
    errorThrower(res: RestResponse) {
      if (res.code !== restCode.success) {
        const error = new Error();
        error.name = 'api-error';
        error.message = res.message;
        throw error;
      }
    },
    errorHandler(error: any) {
      messageUtil.destroy();
      if (error.response) {
        if (error.response.status === 401) {
          history.push(`/user/login`);
        } else {
          alertUtil.error(error.message);
        }
      } else {
        alertUtil.error(error.message);
      }
    },
  },
  /**
   * 请求拦截器
   */
  requestInterceptors: [
    (config: any) => {
      const headers = config.headers;
      headers.Token = getToken();
      return {
        ...config,
        headers,
      };
    },
  ],
  /**
   * 响应拦截器
   */
  responseInterceptors: [
    (res: any) => {
      return res;
    },
  ],
};
