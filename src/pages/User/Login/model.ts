import { Effect, history, Reducer } from 'umi';
import { login } from './service';
import { restCode } from '@/constants/rest';
import { setToken } from '@/utils/request';
import { alertUtil } from '@/utils/message';

/**
 * 登录Model State
 */
interface LoginModelState {
  isLogin: boolean;
}

/**
 * 连接状态
 */
export interface ConnectState {
  user_login: LoginModelState;
}

/**
 * 登录模型
 */
export interface LoginModelType {
  namespace: 'user_login';
  state: LoginModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    changeIsLogin: Reducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'user_login',
  state: {
    isLogin: false,
  },
  effects: {
    *login({ payload }, { call, put }): any {
      yield put({
        type: 'changeIsLogin',
        payload: true,
      });
      const response = yield call(login, payload);
      yield put({
        type: 'changeIsLogin',
        payload: false,
      });
      if (response.code === restCode.success) {
        setToken(response.data);
        history.push('/');
      } else {
        alertUtil.error(response.message);
      }
    },
  },
  reducers: {
    changeIsLogin(state, action) {
      return {
        ...state,
        isLogin: action.payload,
      };
    },
  },
};
export default LoginModel;
