const fs = require('fs-extra');
const ini = require('ini')
const util = require('./util')
const path = require('path')

const CONFIG_DIR = '/.localgit'
const CONFIG_FILE = '/config.ini'

function link(current, to){
    try{
        const dir = current + CONFIG_DIR
        const gitignore = current + '/.gitignore'
        const configDir = dir + CONFIG_FILE

        let config = getConfig(current)
            
        if(fs.existsSync(gitignore))
            if(!util.hasIgnored(fs.readFileSync(gitignore, 'utf-8')))
                fs.appendFileSync(gitignore, '\n.localgit\n');
        
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        
        if(!config.link) 
            fs.appendFileSync(configDir, '[link]\nto = '+ to);
    
    } catch (err) {
        console.log(err);
    }
}

function push(current) {
    try {
        const dir = current + CONFIG_DIR
        let got_link = false;
        let config = {}
        
        if(fs.existsSync(dir))
            config = getConfig(current)

            if(config.link){
                const ignDir = current + '/.glignore';
                got_link = true;
                let ignore;

                if(fs.existsSync(ignDir)){
                    ignore = fs.readFileSync(ignDir, 'utf-8').split("\n")
                    ignore = ignore.map((elem) => { return elem.replace(/\r?\n|\r/g ,""); } )
                }

                fs.copySync(current, config.link.to, { filter: (src, dest) => {
                    if(!ignore) return true;
                    let good = true;

                    ignore.forEach((line, index, arr) => {
                        if(current+"\\"+line.replace(/\//g, "\\") == src){
                            console.log("ignored: " + src); 
                            good = false;
                        }
                    })
                    
                    return good;
                }})
            }
        
        if(!got_link)
            throw new Error('You need to link to a folder before pushing!');
        else
            console.log('Pushed files from ' + current + ' to ' +  config.link.to);

    } catch (err) {
        console.log(err)
    }
}

function getConfig(current){
    const configDir = current + CONFIG_DIR + CONFIG_FILE;
    let config = {};

    if (fs.existsSync(configDir)) 
        config = ini.parse(fs.readFileSync(configDir, 'utf-8'))

    return config;
}


module.exports = { link, push }