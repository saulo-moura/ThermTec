'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/UserType', (fake, index, data) => {
    return {
        description: data[index]
    }
})

Factory.blueprint('App/Models/User', () => {
    return {
        username: 'admin_thermtec',
        email: 'contato@thermtec.com.br',
        password: 'admin@thermtec',
        user_type_id: 1
    }
})

Factory.blueprint('App/Models/Customer', (faker) => {
    return {
        name: faker.name(),
        address: faker.address(),
        user_id: 1
    }
})