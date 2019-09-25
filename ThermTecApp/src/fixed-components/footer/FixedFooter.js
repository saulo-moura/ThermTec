import React, { Component } from 'react';
import { View, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FixedFooter extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View>
                <Footer>
                    <FooterTab>
                        <Button active={this.props.page === 'customers'} vertical onPress={() => navigation.navigate('Customers') }>
                            <Icon active={this.props.page === 'customers'} name="person" />
                            <Text>Clientes</Text>
                        </Button>
                        <Button active={this.props.page === 'services'} vertical onPress={() => navigation.navigate('Services', { customerId: 0, customerName: null }) }>
                            <Icon active={this.props.page === 'services'} name="paper" />
                            <Text>Serviços</Text>
                        </Button>
                        <Button active={this.props.page === 'review'} vertical onPress={() => navigation.navigate('Review') }>
                            <Icon active={this.props.page === 'review'} type="FontAwesome" name="recycle" />
                            <Text>Revisão</Text>
                        </Button>
                        <Button active={this.props.page === 'about'} vertical onPress={() => navigation.navigate('About') }>
                            <Icon active={this.props.page === 'about'} type="MaterialIcons" name="info" />
                            <Text>Sobre</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}