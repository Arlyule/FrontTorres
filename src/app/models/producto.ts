export class Producto {
    id!: number;
    nombreProducto:string;
    imagen: string;
    cantidad: number;
    precio: number;
    existencia! :boolean;
    porAgotarse!: boolean;
    nombreProvedor: string;

    constructor (nombreProducto:string,imagen: string,cantidad: number, precio: number,nombreProvedor: string){
       this.nombreProducto=nombreProducto;
       this.imagen=imagen;
       this.cantidad=cantidad;
       this.precio=precio;
       this.nombreProvedor=nombreProvedor;
    }

}
