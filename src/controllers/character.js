import { getCharactersFromDatabase } from '../db/connector';
import dataImportES6 from '../import/ES6';


const characterControler = async (req, res) => {
  const charactersData = await getCharactersFromDatabase();
  res.status(200).json(charactersData);
  }
  
  export default characterControler;
    