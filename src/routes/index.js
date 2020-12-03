const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/*rutas de redireccion*/

router.get('/callback', indexController.callback)

router.post('/notifications', indexController.notification)

/* GET detail page */
router.get('/detail', indexController.detail);

/* boton */
router.post('/buy', indexController.comprar);

module.exports = router;
