'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Rotas de criação e autenticação de usuários
 */
Route.resource('/users', 'UserController')
Route.post('/auth', 'AuthController.create')

/**
 * Rotas de clientes
 */
Route.resource('customers', 'CustomerController')
  .apiOnly()
  .middleware('auth')

  /**
   * Rotas referentes aos serviços realizados
   */
  Route.resource('services', 'ServiceController')
  .apiOnly()
  .middleware('auth')
  Route.get('services/customer/:customerId', 'ServiceController.getByCustomer')
  Route.get('/servicetypes', 'ServiceTypeController.index')
