var dao=require("./dao.js");
var ObjectID=require("mongodb").ObjectID;

function sistema(){
    this.pulsaciones = {};
    this.dao = new dao.Dao();
    var sis = this;
    this.anotarPulsacion = function(pulsacion, callback){
        puls= new Pulsacion(pulsacion);
        console.log(puls);
        var sis=this;
        this.dao.connect(function(db){
            sis.dao.registrarPulsacion(puls,{});
            //db.close();
        })
    }
}
function Pulsacion(valor){
    this.valor=valor;
}
module.exports.Sistema = sistema;