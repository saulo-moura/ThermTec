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

    const user = await Factory
      .model('App/Models/User')
      .create()

    const customer = await Factory
      .model('App/Models/Customer')
      .createMany(4)

    const serviceType = await Factory
      .model('App/Models/ServiceType')
      .createMany(5, [
        'Manutenção Preventiva',
        'Manutenção Corretiva',
        'Instalação',
        'Carga de Gás',
        'Outros'
      ])

    const service = await Factory
      .model('App/Models/Service')
      .createMany(15)

    const serviceTypeService = await Factory
      .model('App/Models/ServiceTypeService')
      .createMany(10)
  }
}

module.exports = DatabaseSeeder
