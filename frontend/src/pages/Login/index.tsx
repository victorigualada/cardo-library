import LoginForm from '../../components/LoginForm';
import {ConfigProvider} from 'antd';
import frFR from 'antd/locale/en_US';


const Login = () => {
  return (
    <ConfigProvider locale={frFR}>
      <LoginForm />
    </ConfigProvider>

  );
};

export default Login;