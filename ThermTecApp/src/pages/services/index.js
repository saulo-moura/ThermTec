import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Content, Text, Button, Icon, Card, CardItem, Body, Left, Right } from 'native-base';
import FixedHeader from '../../fixed-components/header/FixedHeader'
import FixedFooter from '../../fixed-components/footer/FixedFooter'
import Moment from 'moment'

import api from '../../services/api';

export default class Services extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        customerId: '',
        services: []
    }

    serviceTypes = ""

    async componentDidMount() {
        try {
            const customerId = this.props.navigation.getParam('customerId', null);
            this.setState({customerId: customerId})
            var urlApi = ""
            if (customerId == null) urlApi = "/services"
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
        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <StatusBar hidden />
                <FixedHeader page="services" subtitle="Meus Serviços" navigation={this.props.navigation} customerId={this.state.customerId} />
                <Content>
                    {
                        this.state.services.map((service) => (
                            this.serviceTypes = "",
                            service.types.map((type) => (
                                this.serviceTypes += type.description + ", "
                            )),
                            <Card key={service.id} >
                                <CardItem header button onPress={() => this._onPressButton(service.id)}>
                                    <Left>
                                        <Text style={{ fontSize: 12, width: 400 }}>
                                            <Text style={{fontSize: 12, fontWeight: "bold"}}>Cliente:</Text> {service.customer.code + " - " + service.customer.name}
                                            {"\n"}
                                            <Text style={{fontSize: 12, fontWeight: "bold"}}>Data do Serviço:</Text> {Moment(service.created_at).format("DD/MM/YYYY")}
                                            {"\n"}
                                            <Text style={{fontSize: 12, fontWeight: "bold"}}>Tipo do Serviço:</Text> {this.serviceTypes.trimRight().slice(0, - 1)}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
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