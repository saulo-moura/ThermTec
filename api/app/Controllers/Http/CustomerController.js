'use strict'

const Customer = use("App/Models/Customer")

class CustomerController {
    index ({ request, response }) {
        return Customer.all();
    }
}

module.exports = CustomerController
