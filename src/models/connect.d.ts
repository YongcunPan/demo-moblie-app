import { GlobalModelState } from './global';
import { UserModelState } from './user';
import ModifyModelType from '@/pages/ModifyApplication/model'

/**
 * 全局加载
 */
export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean };
  models: {
    user?: boolean;
    installSheet?: boolean;
  };
}

/**
 * 连接State
 */
export interface ConnectState {
  user: UserModelState;
  loading: Loading;
  global: GlobalModelState;
  modifyapply: ModifyModelType;
  component_fileUpload: any;
  component_imagePreview: any;
}
