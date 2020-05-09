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

Factory.blueprint('App/Models/User', () => {
    return {
        name: 'Administrador',
        email: 'admin@thermtec.com.br',
        password: 'admin@thermtec'
    }
})

Factory.blueprint('App/Models/Customer', (faker) => {
    return {
<<<<<<< HEAD
        code: "CLI" + faker.integer({ min: 1000, max: 9999 }),
=======
        code: 'CLI' + faker.integer({ min: 1000, max: 9999 }),
>>>>>>> 1026b7e2ca2480153d8f0fbfeaade2932eb412ea
        name: faker.name(),
        address: faker.address(),
        user_id: 1
    }
})

Factory.blueprint('App/Models/ServiceType', (faker, index, data) => {
    return {
        description: data[index]
    }
})

Factory.blueprint('App/Models/Service', (faker) => {
    return {
        customer_id: 1,
        description: faker.sentence(),
        cost: faker.floating({ min: 0, max: 1000 })
    }
})

Factory.blueprint('App/Models/ServiceServiceType', (faker) => {
    return {
        service_id: faker.integer({ min: 1, max: 10 }),
        service_type_id: faker.integer({ min: 1, max: 5 })
    }
})