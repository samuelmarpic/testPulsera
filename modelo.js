var dao=require("./dao.js");
var ObjectID=require("mongodb").ObjectID;

function sistema(){
    this.pulsaciones = {};
    this.dao = new dao.Dao();
    var sis = this;
    this.anotarPulsacion = function(pulsacion,callback){
        this.dao.connect(function(db){
            this.dao.registrarPulsacion(pulsacion,callback);
            db.close();
        })
    }
}
module.exports.Sistema = sistema;