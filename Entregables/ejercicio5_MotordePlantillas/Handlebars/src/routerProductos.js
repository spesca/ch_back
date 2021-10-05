const { Router } = require('express');
const Contenedor = require('./ClaseContenedor.js')
const routerProductos = Router();

const contenedorProductos = new Contenedor('./src/productos.txt' )

routerProductos.get('/', async (req, res) => {
    const productos = await contenedorProductos.getAll()
    if(productos.length > 0) {
        res.render('vista.hbs', { productList: productos, listExists: true})
    }
    else {
        res.render('vista.hbs', { productList: productos, listExists: false}) 
    }
});


routerProductos.post('/', async (req, res) => {
    if(req.body.title.length > 0) {
        await contenedorProductos.save(req.body)
    }
    res.redirect('/')
});

/*
routerProductos.get('/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        return res.json({error: 'El parametro ingresado no es un numero'})
    }
    const result = await contenedorProductos.getById(id)
    if(result == null){
        return res.json({error: 'Producto no encontrado'})
    }   
    res.json(result)
})

routerProductos.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        return res.json({error: 'El parametro ingresado no es un numero'})
    }
    const result = await contenedorProductos.getById(id)
    if(result == null){
        return res.json({error: 'Producto no encontrado'})
    }
    const objeto = req.body 
    Object.assign(objeto, {id: id})
    await contenedorProductos.modifyById(objeto)
    res.json({mensaje: 'Producto actualizado'})
});

routerProductos.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)){
        return res.json({error: 'El parametro ingresado no es un numero'})
    }
    const result = await contenedorProductos.getById(id)
    if(result == null){
        return res.json({error: 'Producto no encontrado'})
    }
    await contenedorProductos.deleteById(id)
    res.json({mensaje: 'Producto eliminado'})
});
*/
exports.routerProductos = routerProductos;