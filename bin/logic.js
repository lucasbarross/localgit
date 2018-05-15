var fs = require('fs');
var ini = require('ini')

function link(current, to){
    try{
        var dir = current+'/.localgit';
        var configDir = dir + '/config.ini';
        var config = {};

        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        
        if (fs.existsSync(configDir)) 
            config = ini.parse(fs.readFileSync(configDir, 'utf-8'))
        
        if(!config.link) 
            fs.appendFileSync(configDir, '[link]\nto = '+ to)
    
    } catch (err) {
        console.log(err);
    }
}

module.exports = { link }