import {LockOutlined, UserOutlined,} from '@ant-design/icons';

import {Button, Form} from 'antd';
import React from 'react';
import {LoginContainer, LoginLogo} from './styles';
import {ProFormText} from '@ant-design/pro-components';
import {useAuth} from '../../shared/hooks/useAuth';
import {NewUser} from '../../shared/types/new-user';
import axios from 'axios';

const logoFile: string = process.env.REACT_APP_LOGO_FILE!;
const apiUrl: string = `${process.env.REACT_APP_API_URL!}/auth/sign-up`;

const Signup = () => {
  const { signIn } = useAuth();

  const signUp = async (formUser: NewUser) => {
    await axios.post(`${apiUrl}`, formUser);
    signIn(formUser);
  }

  return (
      <LoginContainer>
        <LoginLogo src={`/assets/${logoFile}`} alt={'Cardo Library'}/>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={(formUser) => signUp(formUser as NewUser)}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'username'}
            rules={[
              {
                required: true,
                message: 'username already taken',
              },
            ]}
          />
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'email'}
            rules={[
              {
                required: true,
                message: 'email invalide',
              },
            ]}
          />
          <ProFormText
            name="name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'First name'}
            rules={[
              {
                required: true,
                message: 'First name is required',
              }
            ]}
          />
          <ProFormText
            name="lastName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Last name'}
            rules={[
              {
                required: true,
                message: 'Last name is required',
              }
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'password'}
          />

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'var(--color-primary)', width: '100%', height: '2.5rem', lineHeight: '1.5', fontSize: '1.125rem' }}>
              Sign up!
            </Button>
          </Form.Item>
        </Form>
      </LoginContainer>
  );
};

export default Signup;