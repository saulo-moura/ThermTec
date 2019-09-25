import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Content, Text, Button, Icon, Card, CardItem, Body, Left, Right } from 'native-base';
import { TouchableHighlight, StyleSheet } from 'react-native';
import FixedHeader from '../../fixed-components/header/FixedHeader'
import FixedFooter from '../../fixed-components/footer/FixedFooter'

import api from '../../services/api';

export default class Services extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        services: []
    }

    async componentDidMount() {
        try {
            const { navigation } = this.props;
            const customerId = navigation.getParam('customerId', 'NO-ID');
            var urlApi = ""
            if (customerId == 0) urlApi = "services"
            else urlApi = '/services/customer/' + customerId
            const response = await api.get(urlApi)
            this.setState({ services: response.data })
        } catch (err) {
            console.tron.log(err)
        }
    }

    _onPressButton(id) {
        alert(id)
    }

    render() {
        const { navigation } = this.props
        const customerName = navigation.getParam('customerName', '');
        var subtitle = ""
        if (customerName == '' || customerName == null) subtitle = "Meus Serviços"
        else subtitle = "Serviços do cliente " + customerName

        return (
            <Container>
                <StatusBar hidden />
                <FixedHeader subtitle={subtitle} />
                <Content>
                    {
                        this.state.services.map((service) => (
                            <Card key={service.id}>
                                <CardItem header button onPress={() => this._onPressButton(service.id)}>
                                    <Left>
                                        <Text>Código: {service.code}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </CardItem>
                                <CardItem button onPress={() => this._onPressButton(service.id)}>
                                    <Left>
                                        <Text>{service.description}</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        ))
                    }
                </Content>
                <FixedFooter page="services" navigation={this.props.navigation} />
            </Container >
        );
    }
}