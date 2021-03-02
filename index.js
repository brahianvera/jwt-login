const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();


const app = express();

//capturar body
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USERL}:${process.env.PASSWORD}@cluster0.og0uy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const option = {useNewUrlParser:true, useUnifiedTopology: true}
mongoose.connect(uri,option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db: ',e));

//import routes 
const authRoutes = require('./routes/auth');

//routes middlewares: es una función que se ejecuta antes de devolver un simple mensaje 
app.use('/api/user', authRoutes);

//routes middlewares
app.get('/',(req,res)=>{
    res.json({
        estado: true,
        mensaje:'funciona!'
    })
});

//inicar server
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=>{
    console.log(`servidor andando en: ${PORT}`);
})