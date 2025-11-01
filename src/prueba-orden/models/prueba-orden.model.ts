export interface Modificador {
  id?: string;
  idModificador?: number;
  nombre?: string;
}

export interface Condimento {
  id?: string;
  idCondimento?: number;
  comentario?: string;
  nombre?: string;
}

export interface Producto {
  id?: string;
  idDetalleOrden?: number;
  idProducto?: number;
  cantidad?: number;
  nombre?: string;
  comentario?: string;
  comanda?: number;
  fechaUltimoRegistro?: string;
  estado?: boolean;
  modificadores?: Modificador[];
  condimentos?: Condimento[];
}

export interface PruebaOrden {
  id?: string;
  numeroOrden?: number;
  numeroMesa?: number;
  numeroComanda?: number;
  mesero?: string;
  horaRegistrada?: string;
  tipoOrden?: number;
  productos: Producto[];
  referenciaOrden?: string;
  proveedor?: string;
  tiempoTranscurrido?: string;
}
