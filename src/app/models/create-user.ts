import { Optional } from "@angular/core";

export class CreateUser {
    nombreUsuario: String;
    email: String;
    password: String;
    roles: Optional ;

    constructor(nombreUsuario: String,email: String, password: String, roles:Optional ){
        this.nombreUsuario=nombreUsuario;
        this.email=email;
        this.password=password;
        this.roles=roles;
    }
}
