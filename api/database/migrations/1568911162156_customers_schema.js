'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('address', 254).notNullable()
      table.bigInteger('phone', 12)
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
