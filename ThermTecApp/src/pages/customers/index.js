import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Content, Subtitle, Text, Left, Body, Button, Icon, Title } from 'native-base';
import { TouchableHighlight, StyleSheet, Image } from 'react-native';
import FooterMenu from '../footerMenu/FooterMenu'

import api from '../../services/api';

export default class Customers extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        user: {
            id: '',
            username: '',
            email: '',
            user_type_id: '',
            customers: []
        },
        count: 0
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users')
            this.setState({ user: response.data })
        } catch (err) {
            console.tron.log(err)
        }
    }

    _onPressButton(id) {
        alert('You tapped the button with id = ' + id)
    }

    _onLongPressButton() {
        alert('You long-pressed the button!')
    }

    render() {
        const renderedCustomers = []
        for (let i = 0; i < this.state.user.customers.length; i++) {
            renderedCustomers.push(
                <TouchableHighlight key={this.state.user.customers[i].id} underlayColor="white">
                    <Button full iconRight rounded style={styles.button} onPress={() => this._onPressButton(this.state.user.customers[i].id)} /*onLongPress={this._onLongPressButton}*/ >
                        <Text style={styles.buttonText}>{this.state.user.customers[i].name}</Text>
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
                        <Title>Olá {this.state.user.name}!</Title>
                        <Subtitle>Meus Clientes</Subtitle>
                    </Body>
                </Header>
                <Content>
                    {renderedCustomers}
                </Content>
                <FooterMenu page="customers" />
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
