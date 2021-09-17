import express from 'express'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import hbs from 'hbs';
import { getGeoCode } from '../utils/geocode.js';
import { getForeCast } from '../utils/forecast.js';

// setting up the __dirname field. As it is not available in module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// static view path and custom view path for hbs template engine
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// view configuration
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (request, response) => {
    response.render('index', {
        title: "Weather",
        name: "bharat"
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: "Help",
        helpText: "Get help here",
        name: "bharat"
    });
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: "About",
        name: "bharat"
    });
});

app.get('/weather', (request, response) => {

    if (!request.query.address) {
        return response.send({ error: 'Address must be provided' })
    }

    getGeoCode(request.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return response.send({error});
        }

        getForeCast(latitude, longitude, (error, foreCastData) => {

            if (error) {
                return response.send({error});
            }
            response.send({
                location,
                foreCastData,
                address : request.query.address
            })
        })
    })
});

app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'provide search param'
        });
    }
    response.send({
        products: []
    });
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        name: 'Bharat',
        title: '404 page',
        errorMsg: 'Help Page not found'
    });
})

app.get('*', (request, response) => {
    response.render('404', {
        name: 'Bharat',
        title: '404 page',
        errorMsg: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server started on 3000 port');
});
