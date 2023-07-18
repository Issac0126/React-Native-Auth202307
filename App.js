import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from "./screens/SignupScreen"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import { Colors } from './constants/styles';
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from './store/auth-context';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500},
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100}
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup'component={SignupScreen}/>
    </Stack.Navigator>
  )
}

function AuthenticatedStack(){
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (  //클릭하면 로그아웃시킴.
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.token && <AuthStack />} {/* 토큰값이 있으면 */}
      {authCtx.token && <AuthenticatedStack />} {/* 토큰값이 없으면 */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({  });
