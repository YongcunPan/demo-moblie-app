import { ColumnType, Option } from '@/constants/data';
import { EnumFunction } from '@/constants/enum';
import { FormItemProps } from 'antd-mobile';
import { FormLayout } from 'antd-mobile/es/components/form';
import { ReactNode } from 'react';
import { BrandSearchProps } from '../Search/BrandSearch/data';
import { CommonSearchProps } from '../Search/CommonSearch/data';
import { DictionarySearchProps } from '../Search/DictionarySearch/data';
import { MarketSearchProps } from '../Search/MarketSearch/data';

export type FieldProps = {
  readonly?: boolean;
  type?: ColumnType;
  /**
   * 字典属性使用
   */
  dicConfig?: DictionarySearchProps;
  marketConfig?: MarketSearchProps;
  brandConfig?: BrandSearchProps;
  selectConfig?: CommonSearchProps;
  options?: Option[];
  hideInForm?: boolean;
  /**
   * 自定义表单项
   */
  render?: (val: any) => ReactNode;
  span?: number;
} & FormItemProps;

export type StandardFormRefProps = {
  validate?: () => Promise<any>;
  resetFields?: () => void;
  setFieldsValue?: (fields: Record<string, any>) => void;
};

export type StandardFormProps = {
  fields: FieldProps[];
  readonly?: boolean;
  layout?: FormLayout;
  form?: any;
  initialValues?: Record<string, any>;
  functionCode?: EnumFunction;
};
