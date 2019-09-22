import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

export default class Home extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Header />
                <Content />
                <Footer>
                    <FooterTab>
                        <Button active vertical>
                            <Icon active name="person" />
                            <Text>Clientes</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="paper" />
                            <Text>Serviços</Text>
                        </Button>
                        <Button vertical>
                            <Icon type="FontAwesome" name="recycle" />
                            <Text>Revisão</Text>
                        </Button>
                        <Button vertical>
                            <Icon type="MaterialIcons" name="info" />
                            <Text>Sobre</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}