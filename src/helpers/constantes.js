
//configuración de api
var iConfig = {
    'KEY_API'         :'apikey',
    'MINUTOS_SESION'  : 5,
    //Respuestas
    'RESPUESTA_OK'    :'OK',
    'RESPUESTA_ERROR' :'NOOK',
    'URLBD'           :'mongodb://localhost:27017/ApiREST'
}
 
//estructura respuestas de servicios
var iResult = {
        retorno     :'',
        resultado   :[]
    }


exports.RespuestaOK = function(req){
    return {
        retorno     : iConfig.RESPUESTA_OK,
        resultado   : req
    };
}

exports.RespuestaError = function(req){
    if (!req){
        return {
            retorno     : iConfig.RESPUESTA_ERROR,
            resultado   : []
        };
    }else{
        return {
            retorno     : iConfig.RESPUESTA_ERROR,
            resultado   : req
        };
    }
}

exports.Result = iResult;
exports.Config = iConfig;