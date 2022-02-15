import { Menus } from "./menu.model";
import { Procesos } from "./proceso.model";

export interface Mepro{
    codm : number;
    codp : number;
    proceso : Procesos;
    menu : Menus;
}