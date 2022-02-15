export interface Personal{
    codper : number;
    nombres : string;
    ap : string;
    am : string;
    tipoper : string;
    estado : number;
    genero : string;
    foto : string;
    urlfoto? : string;
    token? : string;
    dato? : Dato;
    telefono? : Telefono;
}

export interface Dato{
    ci : string;
}

export interface Telefono{
    telefono_id : Telefono_id
}

export interface Telefono_id{
    numero :string;
}