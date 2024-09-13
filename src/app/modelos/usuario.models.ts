import { Rol } from "./rol.models";

export class Usuario {
    usuarioId: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    docIdentidad: string;
    correo: string;
    rolId: number;
    rol: Rol;
}