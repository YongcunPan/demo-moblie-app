import { EnumFunction } from '@/constants/enum';
import { MarketOption } from '@/models/global';

export type MarketSearchValueType = string[] | string;

export interface MarketSearchProps {
  value?: MarketSearchValueType;
  onChange?: (value?: MarketSearchValueType) => void;
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
  onMarketChange?: (val: MarketSearchValueType, option?: MarketOption | MarketOption[]) => void;
  /**
   * 支持多选
   */
  multiple?: boolean;
  style?: React.CSSProperties;
  /**
   * 初始化回调，用于一些特殊场景
   */
  initCallback?: (val?: MarketSearchValueType) => void;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否查询所有市场
   */
  all?: boolean;
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
export type MarketRefProps = {
  /**
   * 所有的选项
   */
  options: MarketOption[];
  /**
   * 当前选中的项
   */
  selectOption: MarketOption | MarketOption[];
};
