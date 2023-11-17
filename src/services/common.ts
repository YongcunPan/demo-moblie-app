import { apiUrl } from '@/constants/api';
import { httpGet, httpPost } from '@/utils/request';

/**
 * 查询所有品牌
 */
export async function queryAllBrands() {
  return httpPost(`${apiUrl.dataCenter}/api/brand/getBrand`, {
    isEnabled: true,
  });
}

/**
 * 获取用户有权限的品牌
 * @param userId 用户ID
 */
export async function queryUserBrands(userId: number) {
  return httpPost(`${apiUrl.dataCenter}/api/brand/getBrand`, {
    userId,
    isEnabled: true,
  });
}

/**
 * 查询所有市场
 */
export async function queryAllMarkets() {
  return httpPost(`${apiUrl.dataCenter}/api/market/getMarket`, {
    isEnabled: true,
  });
}

/**
 * 获取用户有权限的市场
 * @param userId 用户ID
 */
export async function queryUserMarkets(userId: number) {
  return httpPost(`${apiUrl.dataCenter}/api/market/getMarket`, {
    userId,
    isEnabled: true,
  });
}

/**
 * 根据类型获取字典表数据
 * @param categoryId 类型
 */
export async function queryDictionaryByCategory(categoryId: number) {
  return httpGet(`${apiUrl.dataCenter}/api/common/dictionary/get/${categoryId}`);
}

/**
 * 获取附件明细
 * @param params 附件ID
 */
export async function queryAttachmentDetail(params: any) {
  return httpPost(`${apiUrl.dataCenter}/api/file/get`, params);
}
/**
 * 上传文件
 * @param params 参数
 */
export async function uploadAttachment(params: any) {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('attachmentId', params.attachmentId);
  formData.append('fileGroup', params.fileGroup);
  return httpPost(`${apiUrl.dataCenter}/api/file/multiUpload`, formData);
}

/**
 * 上传图片到百宝箱
 * @param params 参数
 */
export async function uploadImageMagicBox(params: any) {
  return httpPost(`${apiUrl.dataCenter}/api/file/multiUpload/magicBox`, params);
}

/**
 * 上传图片到钉钉
 * @param params 参数
 */
export async function uploadImageDingTalk(params: any) {
  return httpPost(`${apiUrl.dataCenter}/api/file/multiUpload/dingDing`, params);
}

/**
 * 删除附件
 * @param params ID集合
 */
export async function delAttachment(params: any) {
  return httpPost(`${apiUrl.dataCenter}/api/file/del`, params);
}
