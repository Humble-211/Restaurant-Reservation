const express = require('express')
const router = express.Router();
const { registerUser, loginUser, makeRes, cancelRes } = require('../controllers/userController.js')
const authMiddleware = require('../middleware/jwt.js')
//user auth
router.post('/register', registerUser)

router.post('/login', loginUser)

//if authMiddleware (jwt token) exist then we can make reservation
router.post('/reservation', authMiddleware, makeRes)
router.post('/reservation/cancel', authMiddleware, cancelRes)
/*
//reservation manage
router.get('/api/reservation', getAllRes) //admin only
router.post('api/reservation', makeRes) //for logged in user only
router.put('api/reservation/:id', modifyRes) // change existing reservation
router.delete('api/reservation/:id', cancelRes) //cancel reservation

*/
module.exports = router
