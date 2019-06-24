const ModelSitio    = require('../models/sitio')
const HelperConfig  = require('../helpers/constantes');
const HelperSesion  = require('../helpers/sesion');
const ip            = require("ip");




exports.index = async (req, res) => {
        res.status(401).send(HelperConfig.RespuestaOK('Hola, Terricola!'));
};
 
exports.crear= async (req, res) => {
    var apikey = req.headers[HelperConfig.Config.KEY_API]
    if (await HelperSesion.sesion_exist_extend(apikey)==0) 
        return res.status(400).send(HelperConfig.RespuestaError())
    
        
    console.log('ok');
    if (apikey && req.body.nombre && req.body.descripcion)
    {
            var sitio = new ModelSitio(
                {
                    nombre: req.body.nombre,
                    descripcion:  req.body.descripcion,
                    ip: ip.address(),
                    fecha_creacion : Date.now(),
                    activo: false
                }
            );
            const sitioBD = await ModelSitio.find({nombre: req.body.nombre});
            if (sitioBD.length>0) return res.status(400).send(HelperConfig.RespuestaError())

            sitio.save(function (err) {
                if (err) {
                    return res.status(401).send(HelperConfig.RespuestaError(err));
                } else {    
                    return res.status(201).send(
                        HelperConfig.RespuestaOK({id:sitio._id})
                    );
                }
                
            })
    }else res.status(404).send(HelperConfig.RespuestaError());
}
 
exports.desactivar= async (req,res) =>{
    const { idsitio } = req.params;
    const sitio = await ModelSitio.findByIdAndUpdate(idsitio,{$set: {activo:false}})
    if (sitio) return res.status(200).send(HelperConfig.RespuestaOK())
    else return res.status(401).send(HelperConfig.RespuestaError())
}

exports.activar= async (req,res) =>{
    const { idsitio } = req.params;
    const sitio = await ModelSitio.findByIdAndUpdate(idsitio,{$set: {activo:true}})
    if (sitio) return res.status(200).send(HelperConfig.RespuestaOK())
    else return res.status(401).send(HelperConfig.RespuestaError())
}