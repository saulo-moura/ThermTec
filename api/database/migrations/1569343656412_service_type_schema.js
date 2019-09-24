'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceTypeSchema extends Schema {
  up () {
    this.create('service_types', (table) => {
      table.increments()
      table.string('description').notNullable()
    })
  }

  down () {
    this.drop('service_types')
  }
}

module.exports = ServiceTypeSchema
