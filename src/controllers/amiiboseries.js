import { getAmiiboseriesFromDatabase } from '../db/connector';

const amiiboseriesControler = async (req, res) => {
  const amiiboseriesData = await getAmiiboseriesFromDatabase();
    res.status(200).json(amiiboseriesData);
  }
  
  export default amiiboseriesControler;
    