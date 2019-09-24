import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import SignIn from './pages/signIn';
import Customers from './pages/customers';
import Services from './pages/services';
import SignUp from './pages/signUp';

const Routes = createStackNavigator({
    Main,
    SignIn,
    Customers,
    Services,
    SignUp
});

export default createAppContainer(Routes);