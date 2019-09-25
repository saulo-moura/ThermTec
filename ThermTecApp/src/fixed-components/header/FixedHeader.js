import React, { Component } from 'react';
import { View, Header, Left, Button, Body, Title, Subtitle } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class FixedHeader extends Component {
    state = {
        username: ""
    }
    async componentDidMount() {
        this.state.username = await AsyncStorage.getItem('@ThermTecApp:username')
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
                    <Body>
                        <Title>Olá {this.state.username}!</Title>
                        <Subtitle>{this.props.subtitle}</Subtitle>
                    </Body>
                </Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 50
    }
});