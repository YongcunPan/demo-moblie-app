import GlobalLoadingPage from '@/loading';
import { ConnectState } from '@/models/connect';
import { useEffect } from 'react';
import { connect, Link, Outlet } from 'umi';
import { SubAppLayoutProps } from './data';
import styles from './style.less';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { ConfigProvider, Result } from 'antd-mobile';
import { getDeviceType, getUrlQuery, setToken } from '@/utils/request';
import { EnumDeviceType } from '@/constants/enum';
import dingTalkUtil from '@/utils/dingTalk';
import { DingTalkCorpId } from '@/constants/data.d';
const deviceType = getDeviceType();

/**
 * 子应用Layout
 * @returns
 */
const SubAppLayout: React.FC<SubAppLayoutProps> = (props) => {
  const { currentUser, loading, dingTalk, dingTalkSign, dispatch } = props;

  const auth = getUrlQuery('auth');

  useEffect(() => {
    if (deviceType === EnumDeviceType.DingTalk) {
      // 免登
      dingTalkUtil.requestAuthCode(DingTalkCorpId).then((code) => {
        dispatch({
          type: 'user/dingTalkAutoLogin',
          payload: code,
        });
      });
    } else {
      if (auth) {
        setToken(auth);
      }
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'user/getUserPrivilege',
      });
      dispatch({
        type: 'global/getAllBrands',
      });
      dispatch({
        type: 'global/getAllMarkets',
      });
    }
  }, []);

  useEffect(() => {
    if (dingTalkSign) {
      // 钉钉配置
      dingTalkUtil.config(dingTalkSign, [
        'device.base.getUUID',
        'biz.telephone.showCallMenu',
        'biz.util.chooseImage',
        'device.geolocation.get',
      ]);
    }
  }, [dingTalkSign]);

  useEffect(() => {
    if (dingTalk?.token) {
      dispatch({
        type: 'user/dingTalkSign',
        payload: window.location.href,
      });
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'user/getUserPrivilege',
      });
    }
  }, [dingTalk]);

  return (
    <div className={styles.container}>
      <ConfigProvider locale={zhCN}>
        {loading ? (
          <GlobalLoadingPage />
        ) : currentUser && currentUser.account ? (
          <Outlet />
        ) : (
          <Result
            status="error"
            title={
              deviceType === EnumDeviceType.DingTalk ? (
                '钉钉鉴权失败，请联系管理员'
              ) : (
                <Link to="/user/login">未登录，请登录</Link>
              )
            }
          />
        )}
      </ConfigProvider>
    </div>
  );
};

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  dingTalkSign: user.dingTalkSign,
  dingTalk: user.dingTalk,
  loading: loading.models.user,
}))(SubAppLayout);
