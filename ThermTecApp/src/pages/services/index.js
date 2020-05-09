import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Content, Text, Icon, Card, CardItem, Left, Right } from 'native-base';
import FixedHeader from '../../fixed-components/header/FixedHeader';
import FixedFooter from '../../fixed-components/footer/FixedFooter';
import Moment from 'moment';

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
            const customerId = this.props.navigation.getParam('customerId', 'NO-ID');
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
        var subtitle = "Meus Serviços"
        
        return (
            <Container>
                <StatusBar hidden />
                <FixedHeader page="services" subtitle={subtitle} navigation={this.props.navigation} />
                <Content>
                    {
                        this.state.services.map((service) => (
                            <Card key={service.id}>
                                <CardItem header button onPress={() => this._onPressButton(service.id)}>
                                    <Left>
                                        <Text style={{fontSize: 14, width: 400}}>Data do Serviço: {Moment(service.created_at).format('DD/MM/YYYY')}</Text>
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