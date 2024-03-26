const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    try {
        const { name, email, password } = req.body;
        let usuario = await Usuario.findOne({ email });

        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario( req.body );

        //encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if ( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese correo'
            });
        } 

    //confirmar match en passwords
    const validPassword = bcrypt.compareSync( password, usuario.password );

    if ( !validPassword ){
        return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
        });
    }

    //generar json web token JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async(req, res = response) => {

    // const uid = req.uid;
    // const name = req.name;
    const { uid, name } = req;

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}