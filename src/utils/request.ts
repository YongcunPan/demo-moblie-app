import { EnumDeviceType } from '@/constants/enum';
import { RestResponse } from '@/constants/rest';
import { request } from 'umi';

/**
 * 获取Token
 */
export function getToken(): string {
  return localStorage.getItem('fis-token-mup_temp') ? `${localStorage.getItem('fis-token-mup_temp')}` : '';
}

/**
 * 设置Token
 * @param token token
 */
export function setToken(token: string): void {
  localStorage.setItem('fis-token-mup_temp', token);
}

/**
 * Get请求
 * @param url 请求连接
 * @returns 返回值
 */
export const httpGet = (url: string, params?: any): Promise<RestResponse> => {
  return request(url, {
    method: 'get',
    params,
  });
};

/**
 * POST请求
 * @param url 接口地址
 * @param data 数据
 * @returns 返回值
 */
export const httpPost = (url: string, data?: any): Promise<RestResponse> => {
  return request(url, {
    method: 'post',
    data,
  });
};

/**
 * 转换为base64
 */
export const base64ToBlob = (data: any, type: string, sliceSize = 512) => {
  const byteCharacters = atob(data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    let i = 0;
    while (i < slice.length) {
      byteNumbers[i] = slice.charCodeAt(i);
      i += 1;
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type });
  return blob;
};

/**
 * 下载文件
 * @param fileData base64文件数据
 * @param fileName 文件名
 */
export const downloadFile = (fileData: string, fileName: string) => {
  const blob = window.URL.createObjectURL(
    base64ToBlob(fileData, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  );
  const tmpa = document.createElement('a');
  tmpa.download = fileName;
  tmpa.href = blob;
  tmpa.click(); // 模拟点击实现下载
  setTimeout(() => {
    // 延时释放
    URL.revokeObjectURL(blob); // 用URL.revokeObjectURL()来释放这个object URL
  }, 100);
};

/**
 * 获取URL中的查询参数
 * @param name 参数名
 * @param url 链接，默认当前浏览器地址
 */
export const getUrlQuery = (name: string, url: string = window.location.href) => {
  const decodeUrl = decodeURIComponent(url);
  const params = new URLSearchParams(decodeUrl.substring(decodeUrl.indexOf('?')));
  return params.get(name);
};

/**
 * 获取登录设备信息
 */
export const getDeviceType = (): EnumDeviceType => {
  if (navigator.userAgent.indexOf('Joywok') > -1) {
    return EnumDeviceType.MagicBox;
  } else if (navigator.userAgent.indexOf('DingTalk') > -1) {
    return EnumDeviceType.DingTalk;
  }
  return EnumDeviceType.H5;
};

/**
 * 滚动到元素
 * @param id DOM的节点ID
 */
export const scrollToElement = (id: string) => {
  const ele = document.getElementById(id);
  if (ele) {
    ele.scrollIntoView();
    ele.focus();
  }
};
