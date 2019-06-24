var express             = require('express');
var router              = express.Router();
var route_controller    = require('../controlles/sitio');


router.get('/',             route_controller.index);
router.post('/crear',       route_controller.crear); // crear sitio

router.put('/:idsitio/activar'    , route_controller.activar) // Activa usuario
router.put('/:idsitio/desactivar' , route_controller.desactivar) // Activa usuario
module.exports = router;