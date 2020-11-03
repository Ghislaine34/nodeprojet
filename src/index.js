import path from 'path';
import express from 'express';
import createRoutes from './routes';
import dataImportES6 from './import/ES6';
import bodyParser from 'body-parser';
import loadDataBase, 
  {
    getTypeFromDatabase, 
    getAmiiboseriesFromDatabase, 
    getCharactersFromDatabase, 
    getGameseriesFromDatabase
  } from './db/connector.js';



const success = () => {
  const app = express();
  const port = "8888";

  app.set('views', path.join(__dirname, 'resources/ejsViews/'));
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use('/',express.static('src/resources/static/jquery-amiibo'));
  app.use('/', createRoutes());
  app.get('/', (req, res) => res.render('index', {port}));

  app.get('/addType', async (req, res) => {
    const typeData = await getTypeFromDatabase();
    return res.render('addType', {type: typeData})
  });

  app.get('/addAmiibo', async (req, res) => {
    const typeData = await getTypeFromDatabase();
    const amiiboseriesData = await getAmiiboseriesFromDatabase();
    const gameseriesData = await getGameseriesFromDatabase();
    const charactersData = await getCharactersFromDatabase();
    return res.render(
      'addAmiibo', 
      {
        type: typeData, 
        gameSeries: amiiboseriesData,
        amiiboSeries: gameseriesData, 
        character: charactersData
      }
    )
  });

  //Personnalise erreur 500
  app.use(function(err, request, response, next) {
    console.log(err);
    response.status(500).sendFile(__dirname + '/assets/500.jpg')
  });

  //Appel de la page 404
  app.use(function (request, response) {
    response.status(404).sendFile(__dirname + '/assets/404.jpg')
  });

  app.listen(port);

  console.log("Server Started");
}

// dataImportES6.load(success, error);

loadDataBase(
  success,
  (err) => console.log("Cannot start server !!!", err)
);
