import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import SignIn from './pages/signIn';
import Home from './pages/home';
import SignUp from './pages/signUp';

const Routes = createStackNavigator({
    Main,
    SignIn,
    Home,
    SignUp
});

export default createAppContainer(Routes);