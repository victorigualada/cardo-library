import {ConfigProvider} from 'antd';
import frFR from 'antd/locale/en_US';
import SignupForm from '../../components/SignupForm';


const Login = () => {
  return (
    <ConfigProvider locale={frFR}>
      <SignupForm />
    </ConfigProvider>

  );
};

export default Login;