const express = require('express')
const exphbs = require('express-handlebars')
const { routerProductos } = require("./routerProductos")


const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true})) 


app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}))

app.set('views', './views')

app.use('/productos', routerProductos)

app.get('/', (req, res) => {
    res.render('formulario.hbs',null);
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))