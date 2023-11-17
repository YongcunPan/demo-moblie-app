import { ConnectState } from '@/models/connect';
import { Button } from 'antd-mobile';
import { memo, useMemo } from 'react';
import { connect } from 'umi';
import { AuthButtonProps } from './data';

/**
 * 带权限校验的按钮
 * @param props 属性
 * @returns
 */
const AuthButton: React.FC<AuthButtonProps> = (props) => {
  const {
    children,
    authKey,
    functionCode,
    brandId,
    marketId,
    dvaAction,
    loading,
    color,
    size,
    dvaActions,
    dvaLoading,
    ...restProps
  } = props;
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

  const innerloading = useMemo(() => {
    if (dvaAction) {
      const currentAction = dvaLoading?.effects[dvaAction || ''];
      return currentAction;
    }
    return dvaLoading?.global;
  }, [dvaLoading?.effects]);

  return hasAuth ? (
    <Button loading={innerloading || loading} size={size || 'middle'} color={color || 'primary'} {...restProps}>
      {children}
    </Button>
  ) : null;
};

export default memo<AuthButtonProps>(
  connect(({ user, loading }: ConnectState) => ({
    dvaActions: user.privilege?.actions,
    dvaLoading: loading,
  }))(AuthButton)
);
