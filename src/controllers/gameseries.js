import dataImportES6 from '../import/ES6';
import { getGameseriesFromDatabase } from '../db/connector';


const gameseriesControler = async (req, res) => {
  const gameseriesData = await getGameseriesFromDatabase();
  res.status(200).json(gameseriesData);
  }
  
  export default gameseriesControler;
    