import dataImportES6 from '../import/ES6';

const amiiboseriesControler = (req, res) => {
    res.status(200).json(dataImportES6.getAmiiboSeries);
  }
  
  export default amiiboseriesControler;
    