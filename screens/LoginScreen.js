import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent'
import { login } from '../util/auth';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

const LoginScreen = () => {

    const authCtx = useContext(AuthContext);

    async function loginHandler({email, password}) {
        
        try{
            const token = await login(email, password);
            console.log("token: "+token);
            authCtx.authenticate(token);
        }catch (error) {
            Alert.alert('api 요청 실패!')
        }
    }

    return ( <AuthContent isLogin onAuthenticate={loginHandler} /> );
}

export default LoginScreen;