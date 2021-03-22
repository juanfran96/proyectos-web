'use strict'
var express=require('express');
var VentaContoller=require('../controllers/venta');

var router=express.Router();

router.get('/home',VentaContoller.home);
router.get('/test',VentaContoller.test);
router.post('/save-venta',VentaContoller.saveVenta);


module.exports=router;