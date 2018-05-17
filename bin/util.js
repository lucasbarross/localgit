function hasIgnored(file){
    let found = false;
    file.split("\n").forEach((line, index, arr) => {
        if(line == '.localgit') found = true;
    });
    return found;
}


module.exports = {
    hasIgnored
}