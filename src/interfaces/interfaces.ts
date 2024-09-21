export interface Vehicle {
    placa: string,
    numMotor: string,
    clase: string,
    chasis: string,
    serie?:string,
    color: string,
    servicio: string,
    marca: string
}

export interface Person{
    tipoPersona: string,
    nombre: string,
    tipoDocumento: string,
    numLicencia: string
}

export interface VehiclePeople{
    vehiculo: Vehicle,
    personas: Person[]
}