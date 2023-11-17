import { EnumFunction } from '@/constants/enum';
import { BrandOption } from '@/models/global';

export type BrandSearchValueType = string[] | string;

export interface BrandSearchProps {
  value?: BrandSearchValueType;
  onChange?: (value?: BrandSearchValueType) => void;
  /**
   * 查询某个用户的品牌
   */
  userId?: number;
  /**
   * 是否逗号分隔显示
   */
  isValueSplit?: boolean;
  /**
   * 品牌改变事件，用于控件需要联动的时候
   */
  onBrandChange?: (val: BrandSearchValueType, option?: BrandOption | BrandOption[]) => void;
  /**
   * 支持多选
   */
  multiple?: boolean;
  style?: React.CSSProperties;
  /**
   * 初始化回调，用于一些特殊场景
   */
  initCallback?: (val?: BrandSearchValueType) => void;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否查询所有品牌
   */
  all?: boolean;
  /**
   * 市场联动，取市场下的品牌
   */
  marketId?: number;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 功能权限
   */
  functionCode?: EnumFunction;
}

/**
 * 品牌Ref 属性
 */
export type BrandRefProps = {
  /**
   * 所有的选项
   */
  options: BrandOption[];
  /**
   * 当前选中的项
   */
  selectOption: BrandOption | BrandOption[];
};
