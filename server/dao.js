var mongo=require("mongodb").MongoClient;
var ObjectID=require("mongodb").ObjectID;

function Dao(){
    this.pulsaciones = undefined;

    this.registrarPulsacion=function(pulsacion,callback){
        insertar(this.pulsaciones,pulsacion,callback);
    }
    this.obtenerPulsaciones=function(callback){
        obtenerTodos(this.pulsaciones,callback);
    }
    this.obtenerPulsacionCriterio=function(criterio,callback){
        obtener(this.pulsaciones,criterio,callback);
    }
    this.modificarColeccionPulsaciones=function(pulsacion,callback){
        modificarColeccion(this.pulsaciones,pulsacion,callback);
    }
    this.eliminarPulsacion=function(uid,callback){
        eliminar(this.pulsaciones,{_id:ObjectID(uid)},callback);
     }
    function obtenerTodos(coleccion,callback){
        coleccion.find().toArray(function(error,col){
            callback(col);
        });
    };
    function obtener(coleccion,criterio,callback){
        coleccion.find(criterio).toArray(function(error,pulsacion){
            if (pulsacion.length==0){
                callback(undefined);
            }
            else{
                callback(pulsacion[0]);
            }
        });
    };
    function insertar(coleccion,elemento,callback){
        console.log(coleccion, elemento);
        coleccion.insertOne(elemento,function(err,result){
            if(err){
                console.log(err);
            }
            else{
                console.log("Nuevo elemento creado");
            }
        });
    }
 
    function eliminar(coleccion,criterio,callback){
        coleccion.remove(criterio,function(err,result){
            if(!err){
                callback(result);
            }
        });
    }
 

    function modificarColeccion(coleccion,pulsacion,callback){
            coleccion.findAndModify({_id:ObjectID(pulsacion._id)},{},pulsacion,{},function(err,result){
                if (err){
                    console.log("No se pudo actualizar (método genérico)");
                }
                else{     
                    console.log("Usuario actualizado"); 
                }
                callback(result);
            });
    }



    this.connect= function(callback){
    var dao=this;
    mongo.connect("mongodb+srv://samuelmarpic:admin@bombergame-sedzp.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true},function(err, database){
                if (err){
                    console.log("No pudo conectar a la base de datos")
                }
                else{
                   console.log("conectado a Mongo: bombergame");
                    database.db("bombergame").collection("resultados",function(err,col){
                        if (err){
                            console.log("No pude obtener la coleccion resultados")
                        }
                        else{       
                            console.log("tenemos la colección resultados");
                            dao.resultados=col;   
                        }
                    });
                    database.db("bombergame").collection("usuarios",function(err,col){
                        if (err){
                            console.log("No pude obtener la coleccion usuarios")
                        }
                        else{       
                            console.log("tenemos la colección usuarios");
                            dao.usuarios=col;   
                        }
                    });
                    database.db("bombergame").collection("pulsaciones",function(err,col){
                        if (err){
                            console.log("No pude obtener la coleccion resultados")
                        }
                        else{       
                            console.log("tenemos la colección resultados");
                            dao.pulsaciones=col;   
                        }
                    });
                    callback(database);
                }
});
}


//this.connect();

}

module.exports.Dao = Dao;