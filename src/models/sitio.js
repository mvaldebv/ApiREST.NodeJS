var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var xSchema = new Schema({
    nombre      : {type: String, required: true, max: 100},
    descripcion : {type: String, required: true, max: 1000},
    ip          : {type: String, required: true},
    fecha_creacion : {type: Date, required: true},
    activo      : {type: Boolean, required: true},
});


// Export the model
module.exports = mongoose.model('Sitio', xSchema);