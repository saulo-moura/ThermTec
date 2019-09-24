'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {
    types() {
        return this
            .belongsToMany('App/Models/ServiceType')
            .pivotModel('App/Models/ServiceTypeService')

    }
    
    customer() {
        return this.belongsTo('App/Models/Customer')
    }
}

module.exports = Service
