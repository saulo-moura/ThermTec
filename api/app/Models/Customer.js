'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
    user () {
        return this.hasOne('App/Model/User')
    }
}

module.exports = Customer
