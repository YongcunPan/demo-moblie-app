import { Outlet } from 'umi';
import styles from './style.less';
import logo from '@/assets/logo.png';

const LoginLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} />
      <div className={styles.title}>OMP手持子应用</div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
