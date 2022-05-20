const request = require('request');
const fs = require('fs');
const { stringify } = require('querystring');

var api = "https://pokeapi.co/api/v2/pokemon/1";
verify();

function requestJSON(){
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

function verify(){
    if(!fs.existsSync("./documents")){
        fs.mkdirSync("./documents")
        
    }
    const nomeApi = nameCreator() + ".json";
    const files = fs.readdirSync("./documents")
    files.forEach(async file =>{
        console.log(file);
        if(nomeApi == file){
            fs.readFileSync(`./documents/${nomeApi}`)
        }
        else{
            let requestJSONAsync = await requestJSON()
            console.log(requestJSONAsync)
            fs.writeFileSync(`./documents/${nomeApi}`, JSON.stringify(requestJSONAsync))
        }
    })    
}

function nameCreator(){
    nomeApi = api.replace(/[.]/g, "-").replace("https://", "").replace(/\//g, "-");
    console.log(nomeApi);
    return nomeApi;
}
