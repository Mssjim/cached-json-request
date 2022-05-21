const request = require('request');
const fs = require('fs');
const { stringify } = require('querystring');
const { getSystemErrorMap } = require('util');

module.exports.main = function(api){
    verify(api)
}


function requestJSON(api){
    return new Promise(async function(dat, err){
    request(api, function (error, response, body) {
        if(error){
            console.log("link quebrado")
            return;
        }
        if(response.statusCode != "200"){
            console.log("Code invalid" + response.statusCode)
            return;
        }
        var objeto
        try {
            objeto = JSON.parse(body)

        } catch (error) {
            console.log("Deu erro amigao, não eh um jason \n" + error)
            return;
        }
        console.log('api toda: ', objeto)
        dat(objeto)
    });
      
    })
}

function verify(api){
    if(!fs.existsSync("./documents")){
        fs.mkdirSync("./documents")
        
    }
    const fileName = nameCreator(api) + ".json";
    const files = fs.readdirSync("./documents")
    files.forEach(async file =>{
        console.log(file);
        if(fileName == file){
            const file = JSON.parse(fs.readFileSync(`./documents/${fileName}`))
            if(file.time < Date.now()-(1000*60*5)){
                return file.data;
            }
        }
        else{

            const requestJSONAsync = await requestJSON(api)
            const newObject = {
                data: requestJSONAsync, 
                time: Date.now()
            } 
            fs.writeFileSync(`./documents/${fileName}`, JSON.stringify(newObject))
        }
    })    
}

function nameCreator(api){
    nomeApi = api.replace(/[.]/g, "-").replace("https://", "").replace(/\//g, "-");
    console.log(nomeApi);
    return nomeApi;
}