const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/auth/auth_routes')
const rolesRoutes = require('../modules/roles/roles_routes')
const usersRoutes = require('../modules/users/users_routes')

Route.use('/auth', authRoutes)
Route.use('/roles', rolesRoutes)
Route.use('/users', usersRoutes)

module.exports = Route
