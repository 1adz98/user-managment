const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
// const clientController = require('../controllers/clientController')
router.get('/',userController.view)
router.post('/',userController.find)

router.get('/:id',userController.delete)

router.get('/addUser',userController.form)
router.post('/adduser',userController.create)

router.get('/editUser/:id',userController.edit)
router.post('/edituser/:id',userController.update)
router.get('/viewuser/:id',userController.viewall)


module.exports = router