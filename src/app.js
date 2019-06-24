const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan')
var mongoose        = require('mongoose');
const HelperConfig  = require('./helpers/constantes')


// Set up mongoose connection

var dev_db_url  = HelperConfig.Config.URLBD;
var mongoDB     = process.env.MONGODB_URI || dev_db_url;

    mongoose.connect(mongoDB,{ useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB conexión error:'));

// HTML
var port = 8001;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routers
app.use('/usuario', require('./routers/usuario'));
app.use('/sitio',   require('./routers/sitio'));

app.set('trust proxy', true);
app.set('port', process.env.PORT || port);

app.listen(port, () => {
    console.log('Servidor corriendo en puerto ' + port);
})
