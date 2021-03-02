const router = require('express').Router();

const User = require('../models/user');

//Herramienta para validar desde el lado del servidor.
const Joi = require('@hapi/joi');
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required
})



router.post('/register', async(req,res)=>{

    //validaciones de  usarios 
    const {error} = schemaRegister.validate(req.body);
    if(error){
       res.status(400).json({error:error.details[0].message});
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        //respuesta con la respuesta del usuario
        const userDB = await user.save();
        res.json({
            error:null,
            data:userDB
        });

    }catch(error){
        res.status(400).json({error})
    }

    res.json({
        error:null,
        data:'data  sdsd sa de registro'
    })
})

module.exports = router;