import { getCharactersFromDatabase } from '../db/connector';

const characterControler = async (req, res) => {
  const charactersData = await getCharactersFromDatabase();
  res.status(200).json(charactersData);
  }
  
  export default characterControler;
    