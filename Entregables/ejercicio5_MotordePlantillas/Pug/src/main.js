const express = require('express')
const { routerProductos } = require("./routerProductos")


const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true})) 

app.set('views', './views')
app.set('view engine','pug')

app.use('/productos', routerProductos)

app.get('/', (req, res) => {
    res.render('formulario.pug',null);
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))