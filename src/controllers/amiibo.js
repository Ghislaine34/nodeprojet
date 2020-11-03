import dataImportES6 from '../import/ES6';


const amiiboControler = (req, res) => {
  const urlParameters = req.query;

  let amiiboList = dataImportES6.getAmiibos.amiibo;

  if (urlParameters.type) amiiboList = dataImportES6.getAmiiboByFilter(amiiboList, "type", urlParameters.type);

  if (urlParameters.amiiboSeries) amiiboList = dataImportES6.getAmiiboByFilter(amiiboList, "amiiboSeries", urlParameters.amiiboSeries);

  if (urlParameters.gameSeries) amiiboList = dataImportES6.getAmiiboByFilter(amiiboList, "gameSeries", urlParameters.gameSeries);

  if (urlParameters.character) amiiboList = dataImportES6.getAmiiboByFilter(amiiboList, "character", urlParameters.character);

  res.status(200).json({amiibo: amiiboList});
};

export const addAmiiboController = (req, res) => {
  const myAmiibo = {
    amiiboSeries: req.body.amiiboSeries,
    character: req.body.character,
    gameSeries: req.body.gameSeries,
    image: req.body.imgAmiibo,
    name: req.body.name,
    type: req.body.type
  };
  //console.log(myAmiibo);
  dataImportES6.addAmiibo(myAmiibo);
  res.status(200).json({result: true});
}

export default amiiboControler;
