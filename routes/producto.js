'use strict'
var express=require('express');
var ProductoContoller=require('../controllers/producto');

var router=express.Router();
var multipart=require('connect-multiparty');
var multipartMiddleware=multipart({uploadDir:'./uploads'});

router.get('/home',ProductoContoller.home);
router.get('/test',ProductoContoller.test);
router.post('/save-producto',ProductoContoller.saveProducto);
router.get('/producto/:id?',ProductoContoller.getProducto);//el simbolo ? significa que es opcional el parametro
router.get('/productos',ProductoContoller.getProductos);
router.put('/producto/:id',ProductoContoller.updateProducto);//para actualizar --- pu
router.delete('/producto/:id',ProductoContoller.deleteProducto);//para eliminar--- delete
router.post('/upload-image/:id',multipartMiddleware, ProductoContoller.uploadImage);
router.get('/get-image/:image',ProductoContoller.getImageFile);

module.exports=router;