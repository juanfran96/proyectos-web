'use strict'
var Producto=require('../models/venta');
var fs =require('fs');
var path=require('path');
const { exists } = require('../models/venta');

var controller={
    home:function(req,res){
        return res.status(200).send({
            message:"Soy la home"
        });
    },
    test:function(req,res){
        return res.status(500).send({
            message:"Soy la pagina test"
        });
    },
    saveVenta:function(req,res){
        var venta=new Venta();
        var params=req.body;
        venta.nombreCliente=params.name;
        venta.apellidoCliente=params.description;
        venta.numeroTarjeta=params.category;
        venta.fechaCaducidad=params.precio;
        venta.csv=params.csv;
        venta.detalle=params.detalle;
        venta.total=params.total;
        venta.save((err,ventaStored)=>{
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!ventaStored) return res.status(404).send({message:'No se hapodidio guardar la venta'});
            return res.status(200).send({venta:ventaStored});
        })
    }
}

module.exports=controller;