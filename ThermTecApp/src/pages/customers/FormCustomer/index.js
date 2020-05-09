import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';
import { Container, Content, Text, H1, Toast } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import FixedHeader from '../../../fixed-components/header/FixedHeader'
import FixedFooter from '../../../fixed-components/footer/FixedFooter'
import { TextInputMask } from 'react-native-masked-text';

import api from '../../../services/api';

export default class FormCustomer extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    state = {
        customer: {
            code: '',
            name: '',
            address: '',
            phone: ''
        },
        error: ''
    };

    phoneNumber = ''

    handleCodeChange = (code) => {
        this.setState({
            customer: {
                code: code,
                name: this.state.customer.name,
                address: this.state.customer.address,
                phone: this.state.customer.phone
            }
        });
    };

    handleNameChange = (name) => {
        this.setState({
            customer: {
                code: this.state.customer.code,
                name: name,
                address: this.state.customer.address,
                phone: this.state.customer.phone
            }
        });
    };

    handleAddressChange = (address) => {
        this.setState({
            customer: {
                code: this.state.customer.code,
                name: this.state.customer.name,
                address: address,
                phone: this.state.customer.phone
            }
        });
    };

    handlePhoneChange = (phone) => {
        this.setState({
            customer: {
                code: this.state.customer.code,
                name: this.state.customer.name,
                address: this.state.customer.address,
                phone: phone
            }
        });
    };

    async _onPressButton() {
        if (this.state.customer.code.length === 0 || this.state.customer.name.length === 0 || this.state.customer.address.length === 0 || this.state.customer.phone.length === 0) {
            this.setState({ error: 'Todos os campos devem ser preenchidos!' }, () => false);
        } else {
            try {
                const response = await api.post('/customers', {
                    code: this.state.customer.code,
                    name: this.state.customer.name,
                    address: this.state.customer.address,
                    phone: this.phoneNumber.getRawValue()
                });

                if (response.status == 200) {
                    Toast.show({
                        text: "Cliente cadastrado com sucesso!",
                        buttonText: "Okay",
                        type: "success",
                        position: "bottom",
                        duration: 5000
                    })
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Customers' }),
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    Toast.show({
                        text: "Erro ao cadastrar usuário!",
                        buttonText: "Okay",
                        type: "danger",
                        position: "bottom",
                        duration: 5000
                        
                    })
                }
            } catch (_err) {
                this.setState({ error: 'Ocorreu um erro ao cadastrar usuário, tente novamente mais tarde!' });
            }
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <StatusBar hidden />
                <FixedHeader page="customers" subtitle="Cadastrar Cliente" navigation={this.props.navigation} />
                <Content>
                    <H1 style={styles.title}>Cadastrar Cliente</H1>
                    <View style={styles.container}>
                        <View style={{ paddingBottom: 10 }}>
                            <TextInput
                                placeholder="Código"
                                style={styles.input}
                                value={this.state.customer.code}
                                onChangeText={this.handleCodeChange}
                                autoCapitalize="characters"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <TextInput
                                placeholder="Nome"
                                style={styles.input}
                                value={this.state.customer.name}
                                onChangeText={this.handleNameChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <TextInput
                                placeholder="Endereço"
                                style={styles.input}
                                value={this.state.customer.address}
                                onChangeText={this.handleAddressChange}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <TextInputMask
                                placeholder="Telefone"
                                style={styles.input}
                                keyboardType='phone-pad'
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={this.state.customer.phone}
                                onChangeText={this.handlePhoneChange}
                                ref={(ref) => this.phoneNumber = ref}
                            />
                        </View>
                    </View>
                    {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                    <TouchableHighlight style={styles.button} onPress={() => this._onPressButton()}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableHighlight >
                </Content>
                <FixedFooter page="customers" navigation={this.props.navigation} />
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 10,
    },
    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: "#22469e",
        alignSelf: "stretch",
        margin: 15,
        marginHorizontal: 20
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: "#FFF",
        alignSelf: "stretch",
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16
    },
    errorMessage: {
        textAlign: "center",
        color: "#ce2029",
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold"
    }
})