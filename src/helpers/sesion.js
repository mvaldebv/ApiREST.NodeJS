var ModelSesion     = require('../models/sesion');
var HelperConfig    = require('../helpers/constantes');
var ip              = require("ip");


//verifica la existencia de sesion
exports.sesion_exist = async (sesionID) =>{
    //Elimino sesiones expiradas
    var updatedDoc = await ModelSesion.updateMany(
        { _id : sesionID, activo :true, fecha_expire: {$lt:Date.now()}}, 
        { $set: { activo: false} }
        );

    var minutosSesion = HelperConfig.Config.MINUTOS_SESION; 
    fecha = new Date();
    var upd = await ModelSesion.findOne(
        { _id : sesionID, activo: true}
        );
    return (upd);
}
//Busco ID Cliente si existe en sesion
exports.sesion_exist_idusuario = async (usuarioID) => {
    //Elimino sesiones expiradas
    var updatedDoc = await ModelSesion.updateMany(
        { usuario : usuarioID, activo :true, fecha_expire: {$lt:Date.now()}}, 
        { $set: { activo: false} }
        );
    //Busco sesion activa no expirada
    try{
        var usuarioBD = await ModelSesion.findOne({usuario : usuarioID, activo:true });
        if (usuarioBD) return (HelperConfig.Config.RESPUESTA_OK) 
        else return (HelperConfig.Config.RESPUESTA_ERROR) 
    } catch (e){
        return (HelperConfig.Config.RESPUESTA_ERROR);
    }   
}

//Crea Sesion
exports.sesion_create = async (usuarioID) =>{
    var minutosSesion = HelperConfig.Config.MINUTOS_SESION; 
    fecha = new Date();
    sesion =  new ModelSesion(
        {
            usuario     : usuarioID,
            ip          : ip.address(),
            fecha_create: Date.now(),
            fecha_expire: fecha.setMinutes(fecha.getMinutes() + minutosSesion),
            activo      : true
        }
    );
    var ses = await sesion.save();
    console.log('ses '+ ses._id);
    if (ses) return (ses._id);
    else return 0;
}

//Extender Sesion por UsuarioID
exports.sesion_extend_idusuario = async (usuarioID) =>{
    var minutosSesion = HelperConfig.Config.MINUTOS_SESION; 
    fecha = new Date();
    var updatedDoc = await ModelSesion.findOneAndUpdate(
        {usuario : usuarioID, activo: true}, 
        { $set: { fecha_expire: fecha.setMinutes(fecha.getMinutes() + minutosSesion)} }
        );
    return updatedDoc._id;   
}

//Extender Sesion por SesionID
exports.sesion_extend = async(sesionID) =>{
    var minutosSesion = HelperConfig.Config.MINUTOS_SESION; 
    fecha = new Date();
    var ext= await ModelSesion.findOneAndUpdate(
        { _id : sesionID, activo: true}, 
        { $set: { fecha_expire: fecha.setMinutes(fecha.getMinutes() + minutosSesion)} }
        );
    return (ext._id);   
}


//Verifica existencia de sesion y la exitende
exports.sesion_exist_extend =async (sesionID) =>{
    var exist = await this.sesion_exist(sesionID);
    if (exist){
        var extend = await this.sesion_extend(sesionID);
        return (extend._id);
    }else{ return (0)}
}