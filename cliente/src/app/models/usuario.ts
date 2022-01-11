export class Usuario {
    _id?: number;
    nombre: string;
    apellido: string;
    email: string;
    edad: number;

    constructor(nombre: string, apellido: string , email: string, edad: number ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.edad = edad;
    }
}