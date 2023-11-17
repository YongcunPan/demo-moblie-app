import { ReactNode } from 'react';

export type ConsultPageWrapperProps = {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
  hideBack?: boolean;
  children?: ReactNode;
  center?: ReactNode;
  ismodifyHeight?: boolean;
  isShowShadow?: boolean;
  isDetail?: boolean;
};
