import React, { Component } from 'react';
import { View, Header, Left, Right, Icon, Button, Body, Title, Subtitle } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class FixedHeader extends Component {
    state = {
        username: ""
    }

    async componentDidMount() {
        this.state.username = await AsyncStorage.getItem('@ThermTecApp:username')
    }

    _onPressButton() {
        switch (this.props.page) {
            case "customers":
                this.props.navigation.navigate("FormCustomer")
                break;
            case "services":
                this.props.navigation.navigate("FormService")
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View>
                <Header>
                    <Left>
                        <Button transparent>
                            <Image style={styles.logo} source={require('../../images/thermtec-blue-transparent.png')} />
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Title style={styles.title}>Olá {this.state.username}!</Title>
                        <Subtitle style={styles.subtitle}>{this.props.subtitle}</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this._onPressButton()}>
                            <Icon type="AntDesign" name='pluscircleo' />
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 50
    },
    title: {
        fontSize: 14
    },
    subtitle: {
        fontSize: 10
    },
    headerBody: {
        width: 300,
        marginLeft: 20
    }
});