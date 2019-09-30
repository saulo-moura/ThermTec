import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Container, Content, Text, H1, Toast, Textarea, Picker, Icon } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import FixedHeader from '../../../fixed-components/header/FixedHeader'
import FixedFooter from '../../../fixed-components/footer/FixedFooter'
import { TextInputMask } from 'react-native-masked-text';
import MultiSelect from 'react-native-multiple-select';

import api from '../../../services/api';

export default class FormService extends Component {
    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    }

    state = {
        service: {
            customer_id: '',
            service_types: [],
            description: '',
            cost: '',
            review_date: ''
        },
        error: '',
        serviceTypes: [],
        customers: [],
        selectedCustomers: []
    };

    cost = ''
    reviewDate = ''

    handleServiceTypeChange = (serviceTypes) => {
        this.setState({
            service: {
                customer_id: this.state.service.customer_id,
                service_types: serviceTypes,
                description: this.state.service.description,
                cost: this.state.service.cost,
                review_date: this.state.service.review_date
            }
        })
    }

    handleDescriptionChange = (description) => {
        this.setState({
            service: {
                customer_id: this.state.service.customer_id,
                service_types: this.state.service.service_types,
                description: description,
                cost: this.state.service.cost,
                review_date: this.state.service.review_date
            }
        })
    }

    handleCostChange = (cost) => {
        this.setState({
            service: {
                customer_id: this.state.service.customer_id,
                service_types: this.state.service.service_types,
                description: this.state.service.description,
                cost: cost,
                review_date: this.state.service.review_date
            }
        })
    }

    handleReviewDateChange = (review_date) => {
        this.setState({
            service: {
                customer_id: this.state.service.customer_id,
                service_types: this.state.service.service_types,
                description: this.state.service.description,
                cost: this.state.service.cost,
                review_date: review_date
            }
        })
    }

    handleCustomerChange = (customer_id) => {
        this.setState({
            service: {
                customer_id: customer_id,
                service_types: this.state.service.service_types,
                description: this.state.service.description,
                cost: this.state.service.cost,
                review_date: this.state.service.review_date
            }
        })
    }

    async componentDidMount() {
        try {
            this.setState({ service: { customer_id: this.props.navigation.getParam('customerId', null) } });
            if (this.state.service.customer_id == null || this.state.service.customer_id == '') {
                const responseCustomer = await api.get("/customers")
                this.setState({ customers: responseCustomer.data })
            }
            const responseTypes = await api.get('/serviceTypes')
            this.setState({ serviceTypes: responseTypes.data })
        } catch (err) {
            console.tron.log(err)
        }
    }

    async _onPressButton() {
        if (this.state.service.customer_id.length == 0 || 
            this.state.service.service_types.length == 0 || 
            this.state.service.description.length == 0 || 
            this.state.service.cost.length == 0) {
            this.setState({ error: 'Todos os campos devem ser preenchidos!' }, () => false);
        } else if (this.state.service.review_date != undefined && !this.reviewDate.isValid()) {
            this.setState({ error: 'A data de revisão deve ser uma data válida!' }, () => false);
        } else {
            try {
                const response = await api.post('/services', {
                    customer_id: this.state.service.customer_id,
                    service_types: this.state.service.service_types,
                    description: this.state.service.description,
                    cost: this.cost.getRawValue(),
                    review_date: this.reviewDate.getRawValue()
                });

                if (response.status == 200) {
                    Toast.show({
                        text: "Serviço cadastrado com sucesso!",
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
                        text: "Erro ao cadastrar serviço!",
                        buttonText: "Okay",
                        type: "danger",
                        position: "bottom",
                        duration: 5000

                    })
                }
            } catch (_err) {
                this.setState({ error: 'Ocorreu um erro ao cadastrar o serviço, tente novamente mais tarde!' });
            }
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#F5F5F5" }}>
                <StatusBar hidden />
                <FixedHeader page="services" subtitle="Cadastrar Serviço" navigation={this.props.navigation} />
                <Content>
                    <H1 style={styles.title}>Cadastrar Serviço</H1>
                    <View style={styles.container}>
                        <View style={{ paddingBottom: 10 }}>
                            <Picker
                                style={styles.input}
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Cliente"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.service.customer_id}
                                onValueChange={this.handleCustomerChange}
                            >
                                {
                                    this.state.customers.map((customer) => (

                                        <Picker.Item key={customer.id} label={customer.code + " - " + customer.name} value={customer.id} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <MultiSelect
                                styleMainWrapper={styles.input}
                                items={this.state.serviceTypes}
                                uniqueKey="id"
                                onSelectedItemsChange={this.handleServiceTypeChange}
                                selectedItems={this.state.service.service_types}
                                selectText="Tipo do Serviço"
                                displayKey="description"
                                hideSubmitButton={true}
                                searchInputPlaceholderText="Buscar"
                            />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <TextInputMask
                                placeholder="Valor Cobrado"
                                style={styles.input}
                                keyboardType='numeric'
                                type={'money'}
                                options={{
                                    precision: 2,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'R$',
                                    suffixUnit: ''
                                }}
                                value={this.state.service.cost}
                                onChangeText={this.handleCostChange}
                                ref={(ref) => this.cost = ref}
                            />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <TextInputMask
                                placeholder="Data de Revisão"
                                style={styles.input}
                                keyboardType='numeric'
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }}
                                value={this.state.service.review_date}
                                onChangeText={this.handleReviewDateChange}
                                ref={(ref) => this.reviewDate = ref}
                            />
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <Textarea
                                placeholder="Descrição"
                                style={styles.input}
                                rowSpan={5}
                                value={this.state.service.description}
                                onChangeText={this.handleDescriptionChange}
                            />
                        </View>
                    </View>
                    {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                    <TouchableHighlight style={styles.button} onPress={() => this._onPressButton()}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableHighlight >
                </Content>
                <FixedFooter page="services" navigation={this.props.navigation} />
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
        width: "90%"
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