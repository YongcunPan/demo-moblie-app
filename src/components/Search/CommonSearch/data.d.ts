import { RestResponse } from '@/constants/rest';

export interface CommonOption {
  id?: number;
  [key: string]: any;
}

export type CommonValueType = string[];

export interface CommonSearchProps {
  placeholder?: string;
  value?: CommonValueType;
  onChange?: (val?: CommonValueType) => void;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 选中项改变事件
   */
  onItemChange?: (val: CommonValueType, option?: CommonOption | CommonOption[]) => void;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 接口返回数据的字段
   */
  dataField?: string;
  /**
   * 标签显示的字段
   */
  labelField?: string;
  /**
   * value显示的字段
   */
  valueField?: string;
  /**
   * 选项列表
   */
  options?: CommonOption[];
  /**
   * 接口函数
   */
  service?: (params?: any) => Promise<RestResponse>;
  title?: string;
}

export type CommonRefProps = {
  options: CommonOption[];
  selectedOption: CommonOption | CommonOption[];
};
