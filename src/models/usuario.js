var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var xSchema = new Schema({
    nombre: {type: String, required: true, max: 100},
    email:  {type: String, required: true, max: 100, uppercase :true},
    clave:  {type: String, required: true, max: 50},
    ip:     {type: String, required: true},
    fecha_creacion : {type: Date, required: true},
    activo: {type: Boolean, required: true},
});


// Export the model
module.exports = mongoose.model('Usuario', xSchema);