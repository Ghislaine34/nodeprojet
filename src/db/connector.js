import { resolveInclude } from 'ejs';
import mysql from 'mysql';
import Importer from 'mysql-import';
import dataImportES6 from '../import/ES6';

const confMySql = {host: "localhost", user: "root", password:"ghislaine82"};


const db = mysql.createConnection(confMySql);

const formatJson = (dbArray) => {
  const amiiboArray = [];
  dbArray.forEach((elt) => {
    amiiboArray.push({name: elt.name})
  });
  return {amiibo: amiiboArray};
}

const getTypeFromDatabase = () => {
  return new Promise(
    (resolve, reject) => {
      db.query(
        "SELECT * FROM types;",
        (err, result) => {
          if (err) reject(err);
          resolve(formatJson(result));
        }
      );
    }
  );
}


const createDatabase = (successCallback, errorCallback) => {
  console.log("Ready to create database");
  const importer = new Importer(confMySql);
  importer.import('./src/db/test.sql').then(
    () => {
      console.log("Database created");
      db.query(
        "USE amiibo",
        (err, result) => {
          if (err) {
            errorCallback(err);
            return;
          }
          importES6Data(successCallback, errorCallback);
        }
      );
    }
  ).catch(
    err => {
      errorCallback(err);
    }
  );
}

const loadSubTable = (tableName, data) => {
  let tableMap = new Map();
  for(let i=0; i<data.length; i++){
      let sql = `INSERT INTO ${tableName} (id, name) VALUES (${i}+1, "${data[i].name}");`;
      tableMap.set(data[i].name, i+1);
      db.query(sql);
  }
  return tableMap;
}


const importES6Data = (successCallback, errorCallback) => {
  console.log("Ready to import ES6 data");
  dataImportES6.load(
    () => {
      console.log("Data ES6 imported");
      const mapType = loadSubTable('types', dataImportES6.getTypes.amiibo);
      const mapCharacter = loadSubTable('characters', dataImportES6.getCharacters.amiibo);
      const mapAmiiboseries = loadSubTable('amiiboseries', dataImportES6.getAmiiboSeries.amiibo);
      const mapGameseries = loadSubTable('gameseries', dataImportES6.getGameSeries.amiibo);

      populateTableAmiibo(mapType, mapCharacter, mapAmiiboseries, mapGameseries);

      /*getDataDb('types');
      getDataDb('characters');
      getDataDb('amiiboseries');
      getDataDb('gameseries');*/
      
      successCallback();
    },
    errorCallback // équivalent à  (err) => {errorCallback(err);}
  )
}

const populateTableAmiibo = (mapType, mapCharacter, mapAmiiboseries, mapGameseries) => {
  dataImportES6.getAmiibos.amiibo.forEach((item) => {
    let sql = `INSERT INTO amiibo (id, name, image, types_id, amiiboseries_id, gameseries_id, characters_id)
      VALUES (
        NULL,
        "${item.name}", 
        "${item.image}", 
        "${mapType.get(item.type)}",
        "${mapAmiiboseries.get(item.amiiboSeries)}", 
        "${mapGameseries.get(item.gameSeries)}",
        "${mapCharacter.get(item.character)}");`;

    db.query(sql)
  });
}



/*const getDataDb = (tableName) => {
  let jsonData = { amiibo: [] };
  db.query(
    "SELECT * FROM " + tableName, (err, result) => {
      if(err) {
        console.log(err);
        return;
      }
      result.forEach(item => {
        jsonData.amiibo.push({ name: item.name });
      });
      console.log(jsonData);
      return jsonData;
    });
}*/


const loadDataBase = (successCallback, errorCallback) => {
  db.connect(
    (err) => {
      if (err) {
        errorCallback(err);
        return;
      }
      db.query(
        "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'amiibo'",
        (err, result) => {
          if (err) {
            errorCallback(err);
            return;
          }
          if (result.length) {
            console.log('Database already exist, DROP !!!')
            db.query(
              "DROP DATABASE amiibo",
              (err, result) => {
                createDatabase(successCallback, errorCallback);
              }
            );
          }else {
            createDatabase(successCallback, errorCallback);
          }
        }
      );
    }
  );
}

export default loadDataBase;
export {getTypeFromDatabase};