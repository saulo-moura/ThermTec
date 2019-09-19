'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.string("code").notNullable().primary()
      table.string("name", 100).notNullable()
      table.string("surname", 100).notNullable()
      table.string("address", 254).notNullable()
      table.string("address_2", 254).notNullable()
      table.string("number", 10)
      table.integer("zipcode", 8)
      table.bigInteger("phone", 12)
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
