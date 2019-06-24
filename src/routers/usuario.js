var express             = require('express');
var router              = express.Router();
var route_controller    = require('../controlles/usuario');


router.get('/',             route_controller.index);
router.post('/crear',       route_controller.crear); // crear usuario
router.post('/login',       route_controller.login); // login usuario

router.put('/:idusuario/activar'    , route_controller.activar) // Activa usuario
router.put('/:idusuario/desactivar' , route_controller.desactivar) // Activa usuario


module.exports = router;