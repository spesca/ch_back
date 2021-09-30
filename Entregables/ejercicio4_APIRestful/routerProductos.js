const { Router } = require('express');
const Contenedor = require('./ClaseContenedor.js')
const routerProductos = Router();

const contenedorProductos = new Contenedor('./productos.txt' )

routerProductos.get('/', async (req, res) => {
    res.json(await contenedorProductos.getAll())
});

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

routerProductos.post('/', async (req, res) => {
    const id = await contenedorProductos.save(req.body)
    res.json({id: id})
});


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

exports.routerProductos = routerProductos;