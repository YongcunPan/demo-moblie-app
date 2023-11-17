import styles from './global.less';
import logo from '@/assets/logo.png';
import { DotLoading } from 'antd-mobile';

const GlobalLoadingPage: React.FC = () => {
  return (
    <div className={styles.loading}>
      <img src={logo} className={styles.logo} />
      <DotLoading />
      <div className={styles.tips}>资源加载中，请稍后...</div>
    </div>
  );
};

export default GlobalLoadingPage;
