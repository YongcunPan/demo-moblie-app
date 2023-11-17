import { restCode } from '@/constants/rest';
import { queryAllBrands, queryAllMarkets } from '@/services/common';
import { Effect, Reducer } from 'umi';

/**
 * 顶层Tab页签
 */
export interface TopTab {
  key?: string;
  url?: string;
  name?: string;
}

export type BrandOption = {
  id?: number;
  cnName?: string;
  enName?: string;
  orderNo?: number;
};

export type MarketOption = {
  id?: number;
  marketName?: string;
  region?: string;
  orderNo?: number;
};

/**
 * 用户Model State
 */
export interface GlobalModelState {
  tabs: TopTab[];
  currentTab: TopTab;
  allBrands: BrandOption[];
  allMarkets: MarketOption[];
  setlisttab: number;
}

/**
 * 用户模型
 */
export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    getAllBrands: Effect;
    getAllMarkets: Effect;
  };
  reducers: {
    changeTabs: Reducer<GlobalModelState>;
    changeCurrentTab: Reducer<GlobalModelState>;
    changeAllBrands: Reducer<GlobalModelState>;
    changeAllMarkets: Reducer<GlobalModelState>;
    setListTab: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    tabs: [],
    currentTab: {},
    allBrands: [],
    allMarkets: [],
    setlisttab: 0,
  },
  effects: {
    *getAllBrands(_, { call, put }): any {
      const response = yield call(queryAllBrands);
      if (response.code === restCode.success) {
        yield put({
          type: 'changeAllBrands',
          payload: response.data,
        });
      }
    },
    *getAllMarkets(_, { call, put }): any {
      const response = yield call(queryAllMarkets);
      if (response.code === restCode.success) {
        yield put({
          type: 'changeAllMarkets',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    changeTabs(state, action) {
      return {
        ...state,
        tabs: action.payload || [],
      };
    },
    changeCurrentTab(state, action) {
      return {
        ...state,
        currentTab: action.payload,
      };
    },
    changeAllBrands(state, action) {
      return {
        ...state,
        allBrands: action.payload || [],
      };
    },
    changeAllMarkets(state, action) {
      return {
        ...state,
        allMarkets: action.payload || [],
      };
    },
    setListTab(state, action) {
      return {
        ...state,
        setlisttab: action.payload || 0,
      };
    },

  },
};

export default GlobalModel;
