import { EnumFunction } from '@/constants/enum';
import { Loading } from '@/models/connect';
import { FunctionAction } from '@/models/user';
import { ButtonProps } from 'antd-mobile';
import React from 'react';

/**
 * 权限相关属性
 */
export interface AuthProps {
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
   * dva的操作，可以根据此，自动控制按钮的loading,规则为modelnamespace/effectname
   */
  dvaAction?: string;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 按钮权限，dva绑定
   */
  dvaActions?: FunctionAction[];
  /**
   * dva loading
   */
  dvaLoading?: Loading;
}

/**
 * 按钮属性类型
 */
export declare type AuthButtonProps = AuthProps & ButtonProps;
