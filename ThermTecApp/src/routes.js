import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import SignIn from './pages/signIn';
import Customers from './pages/customers';
import FormCustomer from './pages/customers/FormCustomer';
import Services from './pages/services';
import FormService from './pages/services/FormService';
import SignUp from './pages/signUp';

const Routes = createStackNavigator({
    Main,
    SignIn,
    Customers,
    FormCustomer,
    Services,
    FormService,
    SignUp
});

export default createAppContainer(Routes);