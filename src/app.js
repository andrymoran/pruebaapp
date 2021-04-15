const express = require('express');

const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');



const app = express();
//Importar rutas
const customerRoutes = require('./routes/customer');


//setting revisa un puerto dispobible a usar si no usa el 3000
app.set("port", process.env.PORT || 3000);
//usar plantillas
app.set('view engine', 'ejs');
//unir directorios
app.set('views', path.join(__dirname, "views"));

//middlewares
app.use(morgan("dev"));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '3012',
    //port: 3306,
    database: 'odo'
},'single'));

//recibe los datos ingresados en la url
app.use(express.urlencoded({extended: false}));


//routes
//llamo el archivos /routes/customer
app.use("/", customerRoutes);
console.log("app");
// archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
console.log('listing');
});