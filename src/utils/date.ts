import dayjs, { ConfigType } from 'dayjs';

/**
 * 日期格式化
 * @param date 需要格式化的日期或者字符串
 * @param format 格式
 * @returns
 */
export const dateFormat = (date?: ConfigType, format: string = 'YYYY-MM-DD') => {
  return date ? dayjs(date).format(format) : '';
};

/**
 * 季度
 * @param date 日期
 * @returns
 */
export const dateQuarter = (date?: ConfigType) => {
  return date;
};
