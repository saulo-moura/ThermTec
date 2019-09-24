'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('code').notNullable().unique()
      table.integer('customer_id').unsigned().notNullable().references('id').inTable('customers')
      table.string('description').notNullable()
      table.decimal('cost', 10, 2)
      table.date('review_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
