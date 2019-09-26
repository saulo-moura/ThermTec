'use strict'

const Customer = use("App/Models/Customer")

class CustomerController {

    /**
   * Mostra todos os clientes do usuário logado.
   * GET customers
   *
   */
    async index({ auth }) {
        const user = await auth.getUser()
        const customers = await Customer
            .query()
            .where('user_id', user.id)
            .fetch()
        return customers
    }

    /**
 * Render a form to be used for creating a new customer.
 * GET customers/create
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
    async create({ request, auth }) {
        const user = await auth.getUser()
        var data = request.only(["name", "address", "phone"])
        const customer = await Customer.create(data)
        return customer
    }

    /**
     * Create/save a new customer.
     * POST customers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const user = await auth.getUser()
        var data = request.only(["name", "address", "phone"])
        data.user_id = user.id
        const customer = await Customer.create(data)
        return customer
    }

    /**
     * Display a single customer.
     * GET customers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
    }

    /**
     * Render a form to update an existing customer.
     * GET customers/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update customer details.
     * PUT or PATCH customers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a customer with id.
     * DELETE customers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }

}

module.exports = CustomerController
