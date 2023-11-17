import { FC, useEffect, useState } from 'react';
import { history } from 'umi';
import Iconfont from '../Iconfont';
import { ConsultPageWrapperProps } from './data';
import styles from './style.less';

const ConsultPageWrapper: FC<ConsultPageWrapperProps> = (props) => {
  const {
    title,
    hideBack,
    left,
    right,
    children,
    onBack,
    center,
    ismodifyHeight = false,
    isShowShadow = false,
    isDetail = false,
  } = props;
  const [scrollTopValue, setScrollTopValue] = useState<boolean>(false);

  useEffect(() => {
    if (isDetail) setScrollTopValue(isShowShadow < 40);
  }, [isShowShadow]);

  return (
    <>
      <div
        className={ismodifyHeight ? styles.modifyHeight : styles.consultHeader}
        style={scrollTopValue ? { boxShadow: '0 0 8px #e3e3e3' } : {}}
      >
        <div className={styles.consultLeft}>
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
              className={center ? `${styles.customStyle}` : `${styles.consultBack}`}
            />
          )}
          {left}
          <div
            className={styles.consultTitle}
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                history.back();
              }
            }}
          >
            {title}
          </div>
        </div>
        <div className={center ? `${styles.customStyle}` : ''}>{center}</div>
        <div className={styles.consultRight}>{right}</div>
      </div>
      <div className={styles.contWrapper} >
        {children}
      </div>
    </>
  );
};

export default ConsultPageWrapper;
