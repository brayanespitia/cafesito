const express = require("express");

const { verificaToken } = require("../middlewares/autenticacion");

let app = express();
let Producto = require("../models/producto");

//-*---------
//pbtener todos los productos
//--------------
app.get("/productos", verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate("usuario", " nombre email")
        .populate("categoria", "descripcion")
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                productos,
            });
        });
});

//-*---------
//pbtener productos por ID
//--    ------------
app.get("/productos/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate("usuario", "nombre email")
        .populate("categoria", "nombre")
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            if (!productoDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: "id no existe",
                    },
                });
            }
            res.json({
                ok: true,
                producto: productoDB,
            });
        });
});

///
/// BUSCAR PRODUCTOS
///

app.get("/productos/buscar/:termino", verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, "i");

    Producto.find({ nombre: regex })
        .populate("categoria", "nombre")
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                productos,
            });
        });
});

//-*--   -------
//crear  un nuevo producto
//-------- ------
app.post("/productos", verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB,
        });
    });
});

//-*--   -------
//ac  ctualizar
//-- ------------
app.put("/productos/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: " el p roducto no existe",
                },
            });
        }
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado,
            });
        });
    });
});

//-* ---------
//borrar un producto
//--------------
app.delete("/productos/:id", (req, res) => {
    let id = req.params.id;
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: " el p roducto no existe",
                },
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: "producto borrado",
            });
        });
    });
});

module.exports = app;