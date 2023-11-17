import { FC } from 'react';
import { history } from 'umi';
import Iconfont from '../Iconfont';
import { PageWrapperProps } from './data';
import styles from './style.less';

const PageWrapper: FC<PageWrapperProps> = (props) => {
  const { title, hideBack, left, right, children, onBack } = props;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          {!hideBack && (
            <Iconfont
              type="icon-back"
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  history.back();
                }
              }}
              className={styles.back}
            />
          )}
          {left}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.right}>{right}</div>
      </div>
      {children}
    </>
  );
};

export default PageWrapper;
