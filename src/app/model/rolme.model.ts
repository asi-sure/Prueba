import { Menus } from "./menu.model";
import { Roles } from "./rol.model";

export interface Mepro{
    codm : number;
    codr : number;
    rol : Roles;
    menu : Menus;
}