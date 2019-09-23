import React, { Component } from 'react';
import { View, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterMenu extends Component {
    render() {
        return (
            <View>
                <Footer>
                    <FooterTab>
                        <Button active={this.props.page === 'customers'} vertical>
                            <Icon active={this.props.page === 'customers'} name="person" />
                            <Text>Clientes</Text>
                        </Button>
                        <Button active={this.props.page === 'services'} vertical>
                            <Icon active={this.props.page === 'services'} name="paper" />
                            <Text>Serviços</Text>
                        </Button>
                        <Button active={this.props.page === 'review'} vertical>
                            <Icon active={this.props.page === 'review'} type="FontAwesome" name="recycle" />
                            <Text>Revisão</Text>
                        </Button>
                        <Button active={this.props.page === 'about'} vertical>
                            <Icon active={this.props.page === 'about'} type="MaterialIcons" name="info" />
                            <Text>Sobre</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}