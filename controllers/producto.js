'use strict'
var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/producto');
//const { exists } = require('../models/project');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: "Soy la home"
        });
    },
    test: function (req, res) {
        return res.status(500).send({
            message: "Soy la pagina test"
        });
    },
    saveProducto: function (req, res) {
        var producto = new Producto();
        var params = req.body;
        producto.name = params.name;
        producto.description = params.description;
        producto.category = params.category;
        producto.precio = params.precio;
        producto.image = null;
        producto.save((err, productoStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });
            if (!productoStored) return res.status(404).send({ message: 'No se hapodidio guardar el producto' });
            return res.status(200).send({ producto: productoStored });
        })
    },
    getProducto: function (req, res) {
        var productoId = req.params.id;
        if (productoId == null) return res.status(404).send({ message: 'El producto no existe' });
        Producto.findById(productoId, (err, producto) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!producto) return res.status(404).send({ message: 'El producto no existe' });
            return res.status(200).send({ producto });
        });
    },
    getProductos: function (req, res) {

            Producto.find({}).sort().exec((err, productos) => {
                if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
                if (!productos) return res.status(404).send({ message: 'No hay productos para mostrar' });
                return res.status(200).send({ productos });
            });
        
    },
    updateProducto: function (req, res) {
        var productoId = req.params.id;
        var update = req.body;
        Producto.findByIdAndUpdate(productoId, update, { new: true }, (err, productoUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar los datos' });
            if (!productoUpdate) return res.status(404).send({ message: 'No existe para actualizar' });
            return res.status(200).send({ producto: productoUpdate });
        });
    },
    deleteProducto: function (req, res) {
        var productoId = req.params.id;
        Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido borrar el producto' });
            if (!productoRemoved) return res.status(404).send({ message: 'No se puede eliminar el producto' });
            return res.status(200).send({ producto: productoRemoved });
        });
    },
    uploadImage: function (req, res) {
        var productoId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (req.files) {
            var filePath = req.files.image.path;
            var file_split = filePath.split('\\');
            var fileName = file_split[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Producto.findByIdAndUpdate(productoId, { image: fileName }, { new: true }, (err, productoUpdated) => {
                    if (err) return res.status(500).send({ message: 'La imagen no se ha subido' });
                    if (!productoUpdated) return res.status(404).send({ message: 'El producto no existe y no se ha subido la imagen' });
                    return res.status(200).send({ producto: productoUpdated });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extensión no es válida' });
                });
            }
        } else {
            return res.status(200).send({ message: fileName });
        }
    },
    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({ message: 'No existe la imagen' });
            }
        });
    }
}

module.exports = controller;