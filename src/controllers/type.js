import dataImportES6 from '../import/ES6';
import { getTypeFromDatabase } from '../db/connector';

const typeController = async (req, res) => {
  const typeData = await getTypeFromDatabase();

  //console.log("DB", typeData);

  res.status(200).json(typeData);
}

export const addTypeController = (req, res) => {
  dataImportES6.addType(req.body.value);
  res.status(200).json({result: true});
}

  
export default typeController;
    