const ModelUsuario  = require('../models/usuario')
const md5           = require('md5');
const HelperConfig  = require('../helpers/constantes');
const HelperSesion  = require('../helpers/sesion')
const ip            = require("ip");

exports.index = async (req, res) => {
        res.status(401).send(HelperConfig.RespuestaOK('Hola, Terricola!'));
};
 
exports.crear= async (req, res) => {
    if (req.body.nombre &&req.body.email && req.body.clave)
    {
            var usuario = new ModelUsuario(
                {
                    nombre: req.body.nombre,
                    email:  req.body.email.toUpperCase(),
                    clave:  md5(req.body.clave),
                    ip: ip.address(),
                    fecha_creacion : Date.now(),
                    activo: false
                }
            );
            const usuarioBD = await ModelUsuario.find({nombre: req.body.nombre, email:req.body.email.toUpperCase()});
            if (usuarioBD.length>0) return res.status(400).send(HelperConfig.RespuestaError())

            usuario.save(function (err) {
                if (err) {
                    return res.status(401).send(HelperConfig.RespuestaError(err));
                } else {    
                    return res.status(201).send(
                        HelperConfig.RespuestaOK({id:usuario._id})
                    );
                }
                
            })
    }else res.status(404).send(HelperConfig.RespuestaError());
}

exports.login= async (req, res) => {
    if (!req.body.email || !req.body.clave){
        res.status(404).send(HelperConfig.RespuestaError());
    }else{
        var query = { 
            email:  req.body.email.toUpperCase(), 
            clave:  md5(req.body.clave),
            activo: true
        };

        var user = await ModelUsuario.findOne(query);
        if (!user) return res.status(404).send(HelperConfig.RespuestaError())  
       
        if(await HelperSesion.sesion_exist_idusuario(user._id) == HelperConfig.Config.RESPUESTA_OK){
            var extSesion = await HelperSesion.sesion_extend_idusuario(user._id);
            if (extSesion!=0)return res.status(201).send(HelperConfig.RespuestaOK({idsesion:extSesion}))
            else return res.status(401).send(HelperConfig.RespuestaError());
        }else{
            var creaSesion= await HelperSesion.sesion_create(user._id)
            if (creaSesion!=0) return res.status(201).send(HelperConfig.RespuestaOK({idsesion:creaSesion}))
            else return res.status(401).send(HelperConfig.RespuestaError());
        }  
    }
}

exports.desactivar= async (req,res) =>{
    const { idusuario } = req.params;
    const user = await ModelUsuario.findByIdAndUpdate(idusuario,{$set: {activo:false}})
    if (user) return res.status(200).send(HelperConfig.RespuestaOK())
    else return res.status(401).send(HelperConfig.RespuestaError())
}

exports.activar= async (req,res) =>{
    const { idusuario } = req.params;
    const user = await ModelUsuario.findByIdAndUpdate(idusuario,{$set: {activo:true}})
    if (user) return res.status(200).send(HelperConfig.RespuestaOK())
    else return res.status(401).send(HelperConfig.RespuestaError())
}