//값들을 전역적으로 보관함

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";

export const AuthContext = createContext({
    token: "",
    authenticate: (token) => {},
    logout: () => {},
});

function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem("token", token);
    }

    function logout(){
        setAuthToken(null);
        AsyncStorage.removeItem("token")
    }

    const value = {
        token: authToken,
        authenticate: authenticate,
        logout : logout,
    };

    return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}

export default AuthContextProvider;





