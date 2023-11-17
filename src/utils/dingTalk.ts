import { apiUrl } from '@/constants/api';
import { restCode, RestResponse } from '@/constants/rest';
import { DingTalkSign } from '@/models/user';
import { ready, config, error, device, biz, runtime } from 'dingtalk-jsapi';
import { alertUtil } from './message';
import { getToken } from './request';

const dingTalkUtil = {
  /**
   * 获取设备ID
   * @returns
   */
  getUUID: () => {
    return new Promise<string>((resolve, reject) => {
      ready(() => {
        device.base
          .getUUID({})
          .then((res) => {
            resolve(res.uuid);
          })
          .catch((err) => {
            alertUtil.error(`获取UUID出错，${JSON.stringify(err)}`);
            reject(err);
          });
      });
    });
  },
  /**
   * 显示加载中
   * @param text 文本
   */
  loading: (text: string) => {
    ready(() => {
      device.notification.showPreloader({
        text,
      });
    });
  },
  /**
   * 隐藏加载中
   */
  hideLoading: () => {
    ready(() => {
      device.notification.hidePreloader({});
    });
  },
  /**
   * 上传文件
   * @param config 配置
   * @param attachmentId 附件ID
   * @returns 文件列表
   */
  uploadImage: (config: { count: number; sourceType: string[] }, attachmentId?: number) => {
    return new Promise<{ key: string; url: string; attachmentId: number }[]>((resolve, reject) => {
      biz.util
        .chooseImage(config)
        .then((res) => {
          if (res.filePaths) {
            const formData = new FormData();
            formData.append('attachmentId', `${attachmentId}`);
            const all = Promise.all(
              res.filePaths.map(async (path) => {
                return await biz.util.uploadFile({
                  fileName: `file`,
                  filePath: path,
                  url: `${apiUrl.dataCenter}/api/file/multiUpload`,
                  header: { Token: getToken() },
                  formData: formData,
                });
              })
            );
            all
              .then((resAll) => {
                if (resAll && resAll.length > 0) {
                  const result = resAll
                    .filter((r) => r.data.code === restCode.success)
                    .map((r) => {
                      const rs: RestResponse = r.data;
                      return {
                        key: rs.data[0].id,
                        url: `${apiUrl.getImage}/${rs.data[0].id}?auth=${getToken()}`,
                        attachmentId: rs.data[0].attachmentId,
                      };
                    });
                  resolve(result);
                }
              })
              .catch((err) => {
                alertUtil.error(`上传出错，${JSON.stringify(err)}`);
                reject(err);
              });
          }
        })
        .catch((err) => {
          alertUtil.error(`上传出错，${JSON.stringify(err)}`);
          reject(err);
        });
    });
  },
  /**
   * 扫一扫
   * @returns 条码结果
   */
  scan: () => {
    return new Promise<string>((resolve, reject) => {
      ready(() => {
        biz.util
          .scan({
            type: 'all',
          })
          .then((res) => {
            resolve(res.text);
          })
          .catch((err) => {
            // 排除用户取消操作
            if (err.errorCode && err.errorMessage) {
              alertUtil.error(`扫码出错，${err.errorMessage}`);
            }
            reject(err);
          });
      });
    });
  },
  /**
   * 定位
   * @returns
   */
  geolocation: () => {
    return new Promise<{ longitude: number; latitude: number; address: string }>((resolve, reject) => {
      ready(() => {
        dingTalkUtil.loading('获取位置信息中...');
        device.geolocation
          .get({
            targetAccuracy: 200,
            coordinate: 1,
            withReGeocode: true,
            useCache: true,
          })
          .then((res) => {
            dingTalkUtil.hideLoading();
            if (res && res.address) {
              resolve({
                latitude: res.latitude,
                longitude: res.longitude,
                address: res.address,
              });
            } else {
              alertUtil.error(`获取位置信息失败，请检查手机[位置信息]是否开启`);
              reject('获取位置信息失败，请检查手机[位置信息]是否开启');
            }
          })
          .catch((err) => {
            dingTalkUtil.hideLoading();
            alertUtil.error(`定位出错，${JSON.stringify(err)}`);
            reject(err);
          });
      });
    });
  },
  /**
   * 获取免登码
   * @param corpId 企业ID
   * @returns
   */
  requestAuthCode: (corpId: string) => {
    return new Promise<string>((resolve, reject) => {
      ready(() => {
        runtime.permission
          .requestAuthCode({ corpId })
          .then((res) => {
            resolve(res.code);
          })
          .catch((err) => {
            alertUtil.error(`获取AuthCode失败，${JSON.stringify(err)}`);
            reject(err);
          });
      });
    });
  },
  /**
   * 钉钉配置
   * @param dingTalkSign 签名
   * @param jsApiList 列表
   */
  config: (dingTalkSign: DingTalkSign, jsApiList: string[]) => {
    config({
      agentId: dingTalkSign.agentId, // 必填，微应用ID
      corpId: dingTalkSign.corpId, //必填，企业ID
      timeStamp: dingTalkSign.timeStamp, // 必填，生成签名的时间戳
      nonceStr: dingTalkSign.nonceStr, // 必填，自定义固定字符串。
      signature: dingTalkSign.signature, // 必填，签名
      type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
      jsApiList: jsApiList,
    });
    error((err) => {
      alertUtil.error(`钉钉config失败：${JSON.stringify(err)}`);
    });
  },
  /**
   * 显示电话拨打界面
   * @param phoneNumber 电话号码
   */
  showCall: (phoneNumber: string) => {
    biz.telephone.showCallMenu({
      phoneNumber: phoneNumber,
    });
  },
  /**
   * 轻提示
   * @param text 文本
   * @param duration 显示持续时间，单位秒，
   * @param icon success和error
   */
  toast: (text: string, duration: number = 3, icon: 'success' | 'error') => {
    ready(() => {
      device.notification.toast({
        icon,
        text,
        duration,
        delay: 0,
      });
    });
  },
};

export default dingTalkUtil;
