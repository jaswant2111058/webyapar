import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login';
import SignUp from './src/screens/signup';
import Home from './src/screens/home';

import { DataProvider } from './src/dataHooks/hooks';

export type RootStackPramList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;


}
const Stack = createNativeStackNavigator<RootStackPramList>()


export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}