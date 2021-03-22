'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var VentaSchema=Schema({
    nombreCliente:String,
    apellidoCliente:String,
    numeroTarjeta:String,
    fechaCaducidad:Date,
    csv:String,
    detalle:Array,
    total:String
});
module.exports=mongoose.model('Venta',VentaSchema);
