'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceTypeServiceSchema extends Schema {
  up () {
    this.create('service_type_services', (table) => {
      table.integer('service_id').unsigned().notNullable().references('id').inTable('services')
      table.integer('service_type_id').unsigned().notNullable().references('id').inTable('service_types')
      table.unique(['service_id', 'service_type_id'])
    })
  }

  down () {
    this.drop('service_type_services')
  }
}

module.exports = ServiceTypeServiceSchema
