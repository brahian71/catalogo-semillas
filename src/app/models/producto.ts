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
}

export interface PropiedadNutricional {
  nombre: string;
  valor: string;
  unidad: string;
}

export enum CategoriaProducto {
  HORTALIZAS = 'hortalizas',
  FRUTAS = 'frutas', 
  HIERBAS = 'hierbas',
  FLORES = 'flores',
  CEREALES = 'cereales',
  LEGUMBRES = 'legumbres'
}