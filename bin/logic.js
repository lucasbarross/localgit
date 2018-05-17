const fs = require('fs');
const ini = require('ini')
const util = require('./util')

function link(current, to){
    try{
        const dir = current+'/.localgit', 
              gitignore = current + '/.gitignore',
              configDir = dir + '/config.ini'
        
        let config = {};
        
        if(fs.existsSync(gitignore))
            if(!util.hasIgnored(fs.readFileSync(gitignore, 'utf-8')))
                fs.appendFileSync(gitignore, '\n.localgit\n')
        
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

function push() {

}



module.exports = { link }