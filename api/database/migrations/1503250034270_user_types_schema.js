'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersTypeSchema extends Schema {
  up () {
    this.create('user_types', (table) => {
      table.increments()
      table.string('description').notNullable()
    })
  }

  down () {
    this.drop('user_types')
  }
}

module.exports = UsersTypeSchema
