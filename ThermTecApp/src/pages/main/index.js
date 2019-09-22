import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import {
    Container,
    Logo,
    Text,
    Button,
    ButtonText
} from './styles';

export default class Main extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    handleCompanyPress = async () => {
        this.props.navigation.navigate('SignIn');
    };

    handleClientPress = () => {
        this.props.navigation.navigate('SignUp');
    };

    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Logo source={require('../../images/thermtec-blue-transparent.png')} resizeMode="contain" />
                <Text>Você é um(a)</Text>
                <Button onPress={this.handleCompanyPress}>
                    <ButtonText>Empresa</ButtonText>
                </Button>
                <Button onPress={this.handleClientPress}>
                    <ButtonText>Cliente</ButtonText>
                </Button>
            </Container>
        );
    }
}