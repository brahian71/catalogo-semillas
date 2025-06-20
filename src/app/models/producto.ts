//src/app/models/producto.ts

export interface Producto {
  id: number;
  nombre: string;
  precio: number; // Precio por kilogramo o por porción
  descripcion: string;
  propiedadesNutricionales: PropiedadNutricional[];
  imagen: string;
  categoria: CategoriaProducto;
  disponible: boolean;
  descuento?: number;
  fechaCreacion: Date;
  unidadVenta: string; // 'kg', '500g', '250g', 'paquete', etc.
  origen?: string; // País o región de origen
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

// ===== INTERFACES DEL CARRITO =====

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

export interface Carrito {
  items: CarritoItem[];
  total: number;
  cantidadItems: number;
  fechaActualizacion: Date;
}

export interface ResumenCarrito {
  cantidadTotalItems: number;
  cantidadTiposProductos: number;
  total: number;
  hayItems: boolean;
}