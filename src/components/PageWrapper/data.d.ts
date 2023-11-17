import { ReactNode } from 'react';

export type PageWrapperProps = {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
  hideBack?: boolean;
  children?: ReactNode;
};
