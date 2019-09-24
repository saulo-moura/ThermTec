import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Content, Subtitle, Text, Left, Body, Button, Icon, Title } from 'native-base';
import { TouchableHighlight, StyleSheet, Image } from 'react-native';
import FooterMenu from '../footerMenu/FooterMenu'

import api from '../../services/api';

export default class Services extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        services: []
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const customerId = navigation.getParam('customerId', 'NO-ID');
        try {
            const response = await api.get('/services/customer/' + customerId  )
            this.setState({ services: response.data })
        } catch (err) {
            console.tron.log(err)
        }
    }

    render() {
        const { navigation } = this.props;
        const customerName = navigation.getParam('customerName', 'NO-NAME');
        const userName = navigation.getParam('userName', 'NO-USERNAME');
        const renderedServices = []
        
        for (let i = 0; i < this.state.services.length; i++) {
            renderedServices.push(
                <TouchableHighlight key={this.state.services[i].id} underlayColor="white">
                    <Button full iconRight rounded style={styles.button} onPress={() => this._onPressButton(this.state.services[i].id)} /*onLongPress={this._onLongPressButton}*/ >
                        <Text style={styles.buttonText}>{this.state.services[i].code}</Text>
                        <Icon style={styles.icon} name="arrow-forward" />
                    </Button>
                </TouchableHighlight>
            )
        }

        return (
            <Container>
                <StatusBar hidden />
                <Header>
                    <Left>
                        <Button transparent>
                            <Image style={styles.logo} source={require('../../images/thermtec-blue-transparent.png')} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Olá {userName}!</Title>
                        <Subtitle>Serviços do cliente {customerName}</Subtitle>
                    </Body>
                </Header>
                <Content>
                    {renderedServices}
                </Content>
                <FooterMenu page="services" />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 5,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#22469e'
    },
    buttonText: {
        textAlign: 'center',
        padding: 15,
        color: 'white'
    },
    icon: {
        textAlign: 'left'
    },
    logo: {
        height: 50,
        width: 50
    }
});
