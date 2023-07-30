import {LockOutlined, UserOutlined,} from '@ant-design/icons';

import {Button, Form} from 'antd';
import React from 'react';
import {LoginContainer, LoginLogo} from './styles';
import {ProFormCheckbox, ProFormText} from '@ant-design/pro-components';
import {useAuth} from '../../shared/hooks/useAuth';

const logoFile: string = process.env.REACT_APP_LOGO_FILE!;

const Login = () => {
  const { signIn } = useAuth();

  return (
      <LoginContainer>
        <LoginLogo src={`/assets/${logoFile}`} alt={'Cardo Library'}/>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={signIn}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'email'}
            rules={[
              {
                required: true,
                message: 'invalid email',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'mot de passe'}
            rules={[
              {
                required: true,
                  message: 'wrong password',
              },
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem'}}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <ProFormCheckbox noStyle name="autoLogin">
                Remember me?
              </ProFormCheckbox>
            </Form.Item>
          </div>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'var(--color-primary)', width: '100%', height: '2.5rem', lineHeight: '1.5', fontSize: '1.125rem' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </LoginContainer>
  );
};

export default Login;