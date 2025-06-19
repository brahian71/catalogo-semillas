//src/app/models/producto.ts

export interface Producto {
  id: number;
  nombre: string;
  precio: number; 
  descripcion: string;
  propiedadesNutricionales: PropiedadNutricional[];
  imagen: string;
  categoria: CategoriaProducto;
  disponible: boolean;
  descuento?: number;
  fechaCreacion: Date;
  unidadVenta: string;
  origen?: string;
}

export interface PropiedadNutricional {
  nombre: string;
  valor: string;
  unidad: string;
}

export enum CategoriaProducto {
  FRUTOS_SECOS = 'frutos-secos',
  SEMILLAS_COMESTIBLES = 'semillas-comestibles',
  GRANOS_CEREALES = 'granos-cereales', 
  LEGUMBRES = 'legumbres',
  DESHIDRATADOS = 'deshidratados',
  ESPECIAS = 'especias',
  HARINAS = 'harinas'
}