import { EnumFunction } from '@/constants/enum';
import { FunctionAction } from '@/models/user';
import React from 'react';

/**
 * 权限相关属性
 */
export interface AuthWrapperProps {
  /**
   * 按钮的key,对应functionAction的enName
   */
  authKey?: string;
  /**
   * 功能枚举
   */
  functionCode?: EnumFunction;
  /**
   * 市场
   */
  marketId?: number;
  /**
   * 品牌
   */
  brandId?: number;
  /**
   * 内容
   */
  children: React.ReactNode;
  /**
   * 按钮权限，dva绑定
   */
  dvaActions?: FunctionAction[];
}
