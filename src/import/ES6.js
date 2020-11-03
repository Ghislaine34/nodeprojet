import https from 'https';

let amiibo = [];
const typeSet = new Set();
const amiiboseriesSet = new Set();
const gameseriesSet = new Set();
const characterSet = new Set();



class ES6 {
    jsonFormat = (amiiboArray) => {
        let formated = { amiibo: [] };

        amiiboArray.forEach(elt => {
            formated.amiibo.push({name: elt});
        })
        return formated;
    };

    get getAmiibos() {
        return { amiibo: amiibo };
    };

    get getTypes() {
        return this.jsonFormat(typeSet);
    };

    get getAmiiboSeries() {
        return this.jsonFormat(amiiboseriesSet);
    };

    get getGameSeries() {
        return this.jsonFormat(gameseriesSet);
    };

    get getCharacters() {
        return this.jsonFormat(characterSet);
    };

    addType(type) {
        typeSet.add(type);
    }

    addAmiibo(newAmiibo) {
        amiibo.push(newAmiibo);
    }

    getAmiiboByFilter = (amiiboArray, fieldToTest, filterValue) =>
      amiiboArray.filter(value => value[fieldToTest] == filterValue)

    request(url, successCallback, errorCallback ){
        https.get(url, (res)=> {
            console.log(res.statusCode);
            if (res.statusCode > 399) {
                errorCallback();
                return;
            }
            if (res.statusCode === 308) {
                this.request(res.headers.location, successCallback, errorCallback);
                return;
            }

            let str = "";

            res.on('data', (data) => {
                str += data;
            });

            res.on('end', () => {
                const parseData = JSON.parse(str);
                for(let i=0; i< parseData.amiibo.length; i++){
                    amiibo.push(parseData.amiibo[i]);

                    typeSet.add(parseData.amiibo[i].type);
                    characterSet.add(parseData.amiibo[i].character)
                    gameseriesSet.add(parseData.amiibo[i].gameSeries)
                    amiiboseriesSet.add(parseData.amiibo[i].amiiboSeries)
                }
                successCallback();
            });
        }).on('error', (event) => {
            errorCallback();
        })
    }

    load(successCallback, errorCallback) {
        this.request("https://www.amiiboapi.com/api/amiibo", successCallback, errorCallback);
    }
}

const dataImportES6 = new ES6();
export default dataImportES6;
