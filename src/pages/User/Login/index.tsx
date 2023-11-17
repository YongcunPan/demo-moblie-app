import AuthButton from '@/components/AuthButton';
import { EnumLoginType } from '@/constants/enum';
import { Form, Input } from 'antd-mobile';
import { connect } from 'umi';
import { UserLoginPageProps } from './data';
import { ConnectState } from './model';
import styles from './style.less';

/**
 * 用户登录页面
 */
const UserLoginPage: React.FC<UserLoginPageProps> = (props) => {
  const { isLogin, dispatch } = props;
  const [form] = Form.useForm();
  /**
   * 登录
   */
  const onLogin = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'user_login/login',
        payload: {
          ...values,
          loginType: EnumLoginType.OMD手持,
        },
      });
    });
  };

  return (
    <div className={styles.container}>
      <Form form={form} className={styles.form}>
        <Form.Item label="用户名" name="account" rules={[{ required: true, message: '用户名必填' }]}>
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码必填' }]}>
          <Input type="password" placeholder="请输入密码" clearable />
        </Form.Item>
      </Form>
      <AuthButton block color="primary" onClick={onLogin} dvaAction="user_login/login">
        {isLogin ? '登录中...' : '登录'}
      </AuthButton>
    </div>
  );
};

export default connect(({ user_login }: ConnectState) => ({
  isLogin: user_login.isLogin,
}))(UserLoginPage);
