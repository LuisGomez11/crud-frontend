export class Persona {

    constructor(id = 0, nombre = '', apellido = '', edad = 0){
		this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
	}
	
	id:number;
	nombre:String;  
	apellido:String;
    edad:number;
}
