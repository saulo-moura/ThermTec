'use strict'

const User = use("App/Models/User")

class UserController {
    async create ({ request })  {
        const data = request.only(["username", "email", "password", "user_type_id"])
        const user = await User.create(data)
        return user
    }   
}

module.exports = UserController
