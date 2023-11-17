import { EnumDeviceType } from '@/constants/enum';
import { Modal, Toast } from 'antd-mobile';
import dingTalkUtil from './dingTalk';
import { getDeviceType } from './request';

const deviceType = getDeviceType();

/**
 * 全局提示
 */
export const messageUtil = {
  /**
   * 成功提示
   * @param content 内容
   * @param duration 持续时间
   */
  success: (content: any, duration: number = 3000) =>
    deviceType === EnumDeviceType.DingTalk
      ? dingTalkUtil.toast(content, duration / 1000, 'success')
      : Toast.show({
          content: content,
          icon: 'success',
          maskClickable: false,
          duration: duration,
        }),
  /**
   * 错误提示
   * @param content 内容
   * @param duration 持续时间
   */
  error: (content: any, duration: number = 3000) =>
    deviceType === EnumDeviceType.DingTalk
      ? dingTalkUtil.toast(content, duration / 1000, 'error')
      : Toast.show({
          content: content,
          icon: 'fail',
          maskClickable: false,
          duration: duration,
        }),
  /**
   * 加载框
   * @param content 内容
   * @param duration 持续时间
   */
  loading: (content: any, duration: number = 0) =>
    deviceType === EnumDeviceType.DingTalk
      ? dingTalkUtil.loading(content)
      : Toast.show({
          content: content,
          icon: 'loading',
          maskClickable: false,
          duration: duration,
        }),
  /**
   * 销毁
   * @param key key
   */
  destroy: () => (deviceType === EnumDeviceType.DingTalk ? dingTalkUtil.hideLoading() : Toast.clear()),
};

/**
 * 警告提示
 */
export const alertUtil = {
  /**
   * 提示框
   * @param content 内容
   * @param title 标题
   */
  info: (content: any, title: string = '提示') => {
    Modal.alert({
      content,
      title,
    });
  },
  /**
   * 错误提示
   * @param content 内容
   * @param title 标题
   */
  error: (content: any, title: string = '错误') => {
    Modal.alert({
      content,
      title,
    });
  },
  /**
   * 确认框
   * @param content 内容
   * @param title 确认
   * @param onConfirm 确认逻辑
   * @param onCancel 取消逻辑
   */
  confirm: (content: string, onConfirm: () => void, title: string = '确认', onCancel: () => void = () => {}) => {
    Modal.confirm({
      title,
      content,
      onConfirm,
      onCancel,
    });
  },
};
