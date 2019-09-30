'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceServiceType extends Model {
    static get table() {
        return "service_service_type"
    }

    static get createdAtColumn () {
        return null
    }

    static get updatedAtColumn () {
        return null
    }
}

module.exports = ServiceServiceType
