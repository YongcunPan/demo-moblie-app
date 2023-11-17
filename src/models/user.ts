import { Effect, getDvaApp, Reducer } from 'umi';
import { dingTalkAuth, dingTalkAutoLogin, dingTalkSign, queryCurrent, queryUserPrivilege } from '@/services/user';
import { restCode } from '@/constants/rest';
import { apiUrl } from '@/constants/api';
import { getToken, setToken } from '@/utils/request';
import { EnumFunction, UserType } from '@/constants/enum';
import { BrandOption, MarketOption } from './global';
import { alertUtil } from '@/utils/message';

/**
 * 当前用户
 */
export interface CurrentUser {
  avatarAttachmentId?: string;
  account?: string;
  id?: number;
  cnName?: string;
  enName?: string;
  mobile?: string;
  email?: string;
  marketAndBrandList?: any[];
  managerId?: number;
  roles?: any[];
  storeId?: number;
  loginType?: string;
  store?: any;
  userType?: UserType;
  marketIds?: string;
  brandIds?: string;
  functionRoleMarketBrandList?: any[];
}

/**
 * 用户菜单
 */
export interface UserMenu {
  code?: string;
  authority?: string[] | string;
  children?: UserMenu[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string | false;
  name?: string;
  key?: string;
  disabled?: boolean;
  path?: string;
  parentKeys?: string[];
  orderNo?: number;
  [key: string]: any;
}

/**
 * 操作类型
 */
export interface FunctionAction {
  id?: number;
  functionId?: number;
  functionName?: string;
  functionCode?: string;
  actionCode?: string;
  actionCnName?: string;
  actionEnName?: string;
  marketAndBrandList?: any[];
}
export type DingTalkUser = {
  account?: string;
  userName?: string;
  userId?: number;
  supplierId?: number;
};

export type DingTalkSign = {
  agentId?: string;
  corpId?: string;
  timeStamp?: string;
  nonceStr?: string;
  signature?: string;
};

export type DingTalk = {
  name?: string;
  mobile?: string;
  token?: string;
  users?: DingTalkUser[];
};

/**
 * 用户Model State
 */
export interface UserModelState {
  currentUser?: CurrentUser;
  avatarUrl?: string;
  privilege?: {
    privileges?: UserMenu[];
    tree?: UserMenu[];
    actions?: FunctionAction[];
  };
  dingTalk?: DingTalk;
  dingTalkSign?: DingTalkSign;
}

/**
 * 用户模型
 */
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    getUserAvatar: Effect;
    getUserPrivilege: Effect;
    dingTalkSign: Effect;
    dingTalkAutoLogin: Effect;
    dingTalkAuth: Effect;
  };
  reducers: {
    changeCurrentUser: Reducer<UserModelState>;
    changeAvatarUrl: Reducer<UserModelState>;
    changePrivilege: Reducer<UserModelState>;
    changeDingTalkSign: Reducer<UserModelState>;
    changeDingTalk: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    privilege: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }): any {
      const response = yield call(queryCurrent);
      if (response.code === restCode.success) {
        yield put({
          type: 'changeCurrentUser',
          payload: response,
        });
      }
    },
    *dingTalkSign({ payload }, { call, put }): any {
      const response = yield call(dingTalkSign, payload);
      if (response.code === restCode.success) {
        yield put({
          type: 'changeDingTalkSign',
          payload: response,
        });
      } else {
        alertUtil.error(response.message);
      }
    },
    *dingTalkAutoLogin({ payload }, { call, put }): any {
      const response = yield call(dingTalkAutoLogin, payload);
      if (response.code === restCode.success) {
        yield put({
          type: 'changeDingTalk',
          payload: response,
        });
        setToken(response.data.token);
      } else {
        alertUtil.error(response.message);
      }
    },
    *dingTalkAuth({ payload }, { call }): any {
      const response = yield call(dingTalkAuth, payload);
      if (response.code === restCode.success) {
        setToken(response.data);
      } else {
        alertUtil.error(response.message);
      }
    },
    *getUserAvatar({ payload }, { call, put }): any {
      const response = yield call(queryCurrent, payload);
      if (response.code === restCode.success) {
        yield put({
          type: 'changeAvatarUrl',
          payload: response,
        });
      }
    },
    *getUserPrivilege(_, { call, put }): any {
      const response = yield call(queryUserPrivilege);
      if (response.code === restCode.success) {
        yield put({
          type: 'changePrivilege',
          payload: response,
        });
      }
    },
  },
  reducers: {
    changeCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data || {},
      };
    },
    changeAvatarUrl(state, action) {
      return {
        ...state,
        avatarUrl: `${apiUrl.getImage}/${
          action.payload.data && action.payload.data.length > 0 && action.payload.data[0].id
        }?auth=${getToken()}`,
      };
    },
    changePrivilege(state, action) {
      return {
        ...state,
        privilege: action.payload.data || {},
      };
    },
    changeDingTalkSign(state, action) {
      return {
        ...state,
        dingTalkSign: action.payload.data || {},
      };
    },
    changeDingTalk(state, action) {
      return {
        ...state,
        dingTalk: action.payload.data || {},
      };
    },
  },
};

/**
 * 获取用户市场
 * @param functionCode
 */
export const getUserMarket = (functionCode?: EnumFunction) => {
  const dva = getDvaApp();
  const allMarkets = dva._store.getState()?.global?.allMarkets;
  const userType = dva._store.getState()?.user?.currentUser?.userType;
  // 获取当前用户的市场
  let marketIds = dva._store.getState()?.user?.currentUser?.marketIds?.split(',');
  if (functionCode && userType !== UserType.管理员) {
    marketIds = dva._store
      .getState()
      ?.user?.currentUser?.functionRoleMarketBrandList?.filter((func: any) => func.functionCode === functionCode)
      ?.map((func: any) => `${func.marketId}`);
  }
  const markets = allMarkets.filter((b: MarketOption) => marketIds?.indexOf(`${b.id}`) > -1);
  return markets;
};

/**
 * 获取用户品牌
 * @param functionCode 功能
 * @param marketId 市场
 * @returns
 */
export const getUserBrand = (functionCode?: EnumFunction, marketId?: number) => {
  // 获取当前用户的品牌
  const dva = getDvaApp();
  const allBrands = dva._store.getState()?.global?.allBrands;
  let brandIds = dva._store.getState()?.user?.currentUser?.brandIds?.split(',');
  const userType = dva._store.getState()?.user?.currentUser?.userType;
  if (functionCode && userType !== UserType.管理员) {
    brandIds = dva._store
      .getState()
      ?.user?.currentUser?.functionRoleMarketBrandList?.filter((func: any) => func.functionCode === functionCode);
    if (marketId) {
      brandIds = brandIds?.filter((func: any) => func.functionCode === functionCode && func.marketId === marketId);
    }
    brandIds = brandIds
      ?.map((func: any) => func.brandIds)
      ?.join(',')
      .split(',');
  } else {
    const marketBrands = dva._store.getState()?.user?.currentUser?.marketAndBrandList;
    // 如果有市场联动，则取对应市场的品牌
    if (marketId) {
      brandIds = marketBrands.find((mb: { marketId: number }) => mb.marketId === marketId)?.brandIds;
    }
  }
  const brands = allBrands.filter((b: BrandOption) => brandIds?.indexOf(`${b.id}`) > -1);
  return brands;
};

export default UserModel;
