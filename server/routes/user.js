const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.view)
router.post('/', userController.find)
router.get('/add_user', userController.form)
router.post('/add_user', userController.save)

module.exports = router