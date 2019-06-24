var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var xSchema = new Schema({
    usuario      :  [{type   : Schema.Types.ObjectId, ref:'Usuario'}],
    ip           :  {type   : String, required: true},
    fecha_create :  {type   : Date, default: Date.now },
    fecha_expire :  {type   : Number, default: 0 },
    activo       :  {type   : Boolean, default :true}
});


// Export the model
module.exports = mongoose.model('Sesion', xSchema); 