import { StyleSheet, View } from "react-native"
import Input from "./Input"
import { useState } from "react";
import Button from "../ui/Button";

const AuthForm = ({isLogin, onSubmit, credentialsInvalid}) => {

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
    
    const {
        email: emailIsInvalid,
        name: nameIsInvalid,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;
    

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
          case "email":
            setEnteredEmail(enteredValue);
            break;
          case "name":
            setEnteredName(enteredValue);
            break;
          case "password":
            setEnteredPassword(enteredValue);
            break;
          case "confirmPassword":
            setEnteredConfirmPassword(enteredValue);
            break;
        }
    }

    function submitHandler() {
        onSubmit({
            email : enteredEmail,
            name : enteredName,
            password : enteredPassword,
            confirmPassword : enteredConfirmPassword
        })
    }


  return (
    <View>
        <View>
            <Input label="이메일 주소" 
                onUpdateValue={updateInputValueHandler.bind(this, "email")} 
                value={enteredEmail}
                keyboardType="email-address" 
                isInvalid={emailIsInvalid}
            />
            {!isLogin && (<Input label="이름" 
                onUpdateValue={updateInputValueHandler.bind(this, "name")} 
                value={enteredName}
                isInvalid={nameIsInvalid}
                />
            )}
            <Input label="비밀번호" 
                onUpdateValue={updateInputValueHandler.bind(this, "password")} 
                value={enteredPassword}
                secure
                isInvalid={passwordIsInvalid}
            />
            {!isLogin && (<Input label="비밀번호 확인" 
                onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")} 
                value={enteredConfirmPassword}
                secure
                isInvalid={passwordsDontMatch}
                />
            )}
            <View style={styles.buttons}>
                {/* react-native의 버튼 X 직접 만든 버튼 활용. */}
                <Button onPress={submitHandler}>
                    {isLogin ? "로그인" : "회원 가입"}
                </Button>
            </View>
        </View>    
    </View>
  )
}

export default AuthForm;


const styles = StyleSheet.create({
    buttons: {
        marginTop: 8,
    }
})


