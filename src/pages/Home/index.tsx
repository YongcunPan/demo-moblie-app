import Iconfont from '@/components/Iconfont';
import PageWrapper from '@/components/PageWrapper';
import { EnumDeviceType } from '@/constants/enum';
import { ConnectState } from '@/models/connect';
import { getDeviceType } from '@/utils/request';
import { FC } from 'react';
import { connect, history } from 'umi';
import { HomePageProps } from './data';
import styles from './style.less';
import zxIcon from '@/assets/zxIcon.png';

const deviceType = getDeviceType();

const HomePage: FC<HomePageProps> = (props) => {
  const { dingTalk, currentUser } = props;
  return (
    <PageWrapper title="首页" hideBack>
      <div className={styles.user}>
        {/* <span>{deviceType === EnumDeviceType.DingTalk ? dingTalk?.name : currentUser?.cnName}</span> */}
        <span style={{ margin: '0 1.5rem' }}>欢迎使用OMD，请选择进入应用</span>
        {/* <span>{deviceType === EnumDeviceType.DingTalk ? dingTalk?.mobile : currentUser?.mobile}</span> */}
      </div>
      <div className={styles.content}>
        <div
          className={styles.item}
          onClick={() => {
            history.push(`/consult`);
          }}
        >
          {/* <Iconfont type="icon-install" className={styles.icon} /> */}
          <img src={zxIcon} alt="" className={styles.zxIcon} />
          <div className={styles.text}>业务咨询</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default connect(({ user }: ConnectState) => ({
  dingTalk: user.dingTalk,
  currentUser: user.currentUser,
}))(HomePage);
