export default function makeId(length){
    var result='';
    var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for(var i=0;i<length;i++){
        result+= characters.charAt(Math.floor(Math.random()*52))
    }
    return result;
};

