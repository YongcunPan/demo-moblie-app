import { ConnectState } from '@/models/connect';
import { memo, useMemo } from 'react';
import { connect } from 'umi';
import { AuthWrapperProps } from './data';

/**
 * 内容校验封装器
 * @param props 属性
 * @returns
 */
const AuthWrapper: React.FC<AuthWrapperProps> = (props) => {
  const { children, authKey, functionCode, brandId, marketId, dvaActions } = props;
  const hasAuth = useMemo((): boolean => {
    if (functionCode && authKey) {
      // 从dva的store中获取state
      const functionActions = dvaActions?.filter((act) => act.functionCode === functionCode) || [];
      const marketAndBrandList = functionActions.find((f) => f.actionEnName === authKey)?.marketAndBrandList;
      const marketBrand = marketAndBrandList?.find((m) => m.marketId === marketId);
      const auth = functionActions.some(
        (funcA) =>
          funcA.actionEnName === authKey &&
          (!marketId || (marketBrand && marketBrand.marketId === marketId)) &&
          (!brandId ||
            (marketBrand && marketBrand.brandIds && marketBrand.brandIds.split(',').indexOf(`${brandId}`) > -1))
      );
      return auth;
    }
    return true;
  }, [functionCode, authKey, brandId, marketId, dvaActions]);

  return <>{hasAuth ? children : null}</>;
};

export default memo<AuthWrapperProps>(
  connect(({ user }: ConnectState) => ({
    dvaActions: user.privilege?.actions,
  }))(AuthWrapper)
);
