import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import OtherScreen from '../screens/OtherScreen';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CreateUserScreen from '../screens/CreateUserScreen'
import PlayScreen from '../screens/PlayScreen'
import QuestionScreen from '../screens/QuestionScreen'

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const CreateStack = createStackNavigator({ CreateUser: CreateUserScreen })
const PlayStack = createStackNavigator({ Play: PlayScreen})
const QuestionStack = createStackNavigator({Question: QuestionScreen})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Create: CreateStack,
    Play: PlayScreen,
    Question: QuestionStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));