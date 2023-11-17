import { FC, useState } from 'react';
import { ContentGroupProps } from './data';
import styles from './style.less';
import zhangkai from '@/assets/zhankai.png';
import shouqi from '@/assets/shouqi.png';

const ContentGroup: FC<ContentGroupProps> = (props) => {
  const { children, title } = props;
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <div className={styles.container}>
      <div onClick={() => setVisible(!visible)} className={styles.header}>
        <span className={styles.title}>{title}</span>
        <img className={styles.icon} src={visible ? shouqi : zhangkai} />
      </div>
      <div className={`${visible ? styles.show : styles.hide}`}>{children}</div>
    </div>
  );
};

export default ContentGroup;
