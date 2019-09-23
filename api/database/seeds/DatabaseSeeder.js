'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run() {
    const userType = await Factory
      .model('App/Models/UserType')
      .createMany(2, [
        'Empresa',
        'Cliente'
      ])

    const user = await Factory
      .model('App/Models/User')
      .create()

    const customer = await Factory
      .model('App/Models/Customer')
      .createMany(4)
  }
}

module.exports = DatabaseSeeder
