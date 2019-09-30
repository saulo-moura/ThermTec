import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Content, Text, Button, Icon, List, ListItem, Right, Left } from 'native-base';
import FixedHeader from '../../fixed-components/header/FixedHeader'
import FixedFooter from '../../fixed-components/footer/FixedFooter'
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

export default class Customers extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        user: {
            id: '',
            code: '',
            name: '',
            email: '',
            customers: []
        }
    }

    async componentDidMount() {
        try {
            const response = await api.get('/users')
            this.setState({ user: response.data })
            await AsyncStorage.setItem('@ThermTecApp:username', this.state.user.name);
        } catch (err) {
            console.tron.log(err)
        }
    }

    _onPressButton(id) {
        this.props.navigation.navigate('Services', { customerId: id })
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <StatusBar hidden />
                <FixedHeader page="customers" subtitle="Meus Clientes" navigation={this.props.navigation} />
                <Content>
                    <List>
                        {
                            this.state.user.customers.map((customer) => (
                                <ListItem onPress={() => this._onPressButton(customer.id)} key={customer.id}>
                                    <Left>
                                        <Text>{customer.code} - {customer.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            ))
                        }
                    </List>

                </Content>
                <FixedFooter page="customers" navigation={this.props.navigation} />
            </Container >
        );
    }
}