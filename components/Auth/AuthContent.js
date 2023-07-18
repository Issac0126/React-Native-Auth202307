import { Alert, StyleSheet, View } from "react-native"
import AuthForm from "./AuthForm"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import FlatButton from "../ui/FlatButton";
import { useNavigation } from "@react-navigation/native";

const AuthContent = ({isLogin, onAuthenticate}) => {
    
    const navigation = useNavigation();
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        name: false,
        password: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if(isLogin){ //로그인이 되어있는지 확인. 
            navigation.replace('Signup');
            // navigation.navigator('Signup'); // 뒤로가기 제공
        } else{
            navigation.replace('Login')
        }
    }

    function submitHandler(credentials) { // 유효성 검증 진행
        let { email, name, password, confirmPassword } = credentials; //디스트럭쳐링
        console.log("들어온 이메일: ", email);

        email = email.trim();
        password = password.trim();
        const nameRegex = /^[가-힣]{2,6}$/;

        //검증 : 검증해서 boolean타입으로 받아내기.
        const emailIsValid = email.includes("@");
        const nameIsValid = nameRegex.test(name);
        const passwordIsValid = password.length > 6;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!nameIsValid || !passwordsAreEqual))
        ) {
            Alert.alert( "유효하지 않은 입력값이 있습니다. 확인 후 다시 입력해 주세요." );
            setCredentialsInvalid({
                email: !emailIsValid,
                name: !nameIsValid,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            }); // if문에 걸리게 된다면 전부 false처리함. 
            return;
        }

        onAuthenticate({email, password, name});
    }

  return (
    <View style={styles.authContent}>
        <AuthForm  
            isLogin={isLogin}
            onSubmit={submitHandler} // 함수 전달받음.
            credentialsInvalid={credentialsInvalid} //사용자입력 유효성 검사 결과
        />
        <View style={styles.buttons}>
            <FlatButton onPress={switchAuthModeHandler}>
                {isLogin ? '회원 가입하기' : '로그인 화면으로 이동하기.'}
            </FlatButton>
        </View>
    </View>
  );
}

export default AuthContent;


const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    buttons: {
        marginTop: 8,
    }
})