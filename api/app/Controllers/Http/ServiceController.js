'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Service = use("App/Models/Service")
const ServiceServiceType = use("App/Models/ServiceServiceType")

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Mostra todos os serviços realizados pelo usuário logado.
   * GET services
   *
   */
  async index({ auth }) {
    const user = await auth.getUser()
    const services = await Service
      .query()
      .whereHas('customer', (builder) => {
        builder.where('user_id', user.id)
      })
      .with('customer')
      .with('types')
      .fetch()
    return services
  }

  /**
   * Render a form to be used for creating a new service.
   * GET services/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const serviceData = request.only(["customer_id", "description", "cost", "review_date"])
    const service = await Service.create(serviceData)

    const serviceTypesData = request.only(["service_types"])
    serviceTypesData.service_types.map((service_type) => {
      var serviceTypes = new ServiceServiceType()
      serviceTypes.service_id = service.id
      serviceTypes.service_type_id = service_type
      serviceTypes.save()
    })
    
    return service
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing service.
   * GET services/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  async getByCustomer({ params }) {
    const services = await Service
      .query()
      .where('customer_id', params.customerId)
      .with('customer')
      .with('types')
      .fetch()
    return services
  }
}

module.exports = ServiceController
