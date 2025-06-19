//src/app/services/productos.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, CategoriaProducto, PropiedadNutricional } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosSubject = new BehaviorSubject<Producto[]>(this.obtenerProductosIniciales());
  public productos$ = this.productosSubject.asObservable();

  constructor() { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.productos$;
  }

  // Obtener producto por ID
  getProductoPorId(id: number): Producto | undefined {
    return this.productosSubject.value.find(producto => producto.id === id);
  }

  // Filtrar por categoría
  getProductosPorCategoria(categoria: CategoriaProducto): Observable<Producto[]> {
    return new BehaviorSubject(
      this.productosSubject.value.filter(producto => producto.categoria === categoria)
    ).asObservable();
  }

  // Buscar productos
  buscarProductos(termino: string): Observable<Producto[]> {
    const terminoLower = termino.toLowerCase();
    return new BehaviorSubject(
      this.productosSubject.value.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoLower) ||
        producto.descripcion.toLowerCase().includes(terminoLower)
      )
    ).asObservable();
  }

  // Datos de ejemplo para el catálogo de productos secos a granel
  private obtenerProductosIniciales(): Producto[] {
    return [
      {
        id: 1,
        nombre: 'Almendras Naturales',
        precio: 18500,
        descripcion: 'Almendras naturales sin sal, perfectas para snacks saludables o repostería.',
        propiedadesNutricionales: [
          { nombre: 'Proteína', valor: '21.1', unidad: 'g/100g' },
          { nombre: 'Fibra', valor: '12.5', unidad: 'g/100g' },
          { nombre: 'Vitamina E', valor: '25.6', unidad: 'mg/100g' },
          { nombre: 'Magnesio', valor: '270', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/almendras.jpg',
        categoria: CategoriaProducto.FRUTOS_SECOS,
        disponible: true,
        unidadVenta: '500g',
        origen: 'California, USA',
        fechaCreacion: new Date('2024-01-15')
      },
      {
        id: 2,
        nombre: 'Nueces Mariposa',
        precio: 22000,
        descripcion: 'Nueces frescas y crujientes, ricas en omega-3 y antioxidantes.',
        propiedadesNutricionales: [
          { nombre: 'Omega-3', valor: '9.1', unidad: 'g/100g' },
          { nombre: 'Proteína', valor: '15.2', unidad: 'g/100g' },
          { nombre: 'Manganeso', valor: '3.4', unidad: 'mg/100g' },
          { nombre: 'Cobre', valor: '1.6', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/nueces.jpg',
        categoria: CategoriaProducto.FRUTOS_SECOS,
        disponible: true,
        descuento: 10,
        unidadVenta: '500g',
        origen: 'Chile',
        fechaCreacion: new Date('2024-01-20')
      },
      {
        id: 3,
        nombre: 'Semillas de Chía',
        precio: 12500,
        descripcion: 'Semillas de chía orgánicas, superalimento rico en fibra y omega-3.',
        propiedadesNutricionales: [
          { nombre: 'Fibra', valor: '34.4', unidad: 'g/100g' },
          { nombre: 'Proteína', valor: '16.5', unidad: 'g/100g' },
          { nombre: 'Omega-3', valor: '17.8', unidad: 'g/100g' },
          { nombre: 'Calcio', valor: '631', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/chia.jpg',
        categoria: CategoriaProducto.SEMILLAS_COMESTIBLES,
        disponible: true,
        unidadVenta: '250g',
        origen: 'México',
        fechaCreacion: new Date('2024-02-01')
      },
      {
        id: 4,
        nombre: 'Quinoa Blanca',
        precio: 8900,
        descripcion: 'Quinoa blanca premium, grano andino libre de gluten y alto en proteína.',
        propiedadesNutricionales: [
          { nombre: 'Proteína', valor: '14.1', unidad: 'g/100g' },
          { nombre: 'Fibra', valor: '7', unidad: 'g/100g' },
          { nombre: 'Hierro', valor: '4.6', unidad: 'mg/100g' },
          { nombre: 'Magnesio', valor: '197', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/quinoa.jpg',
        categoria: CategoriaProducto.GRANOS_CEREALES,
        disponible: true,
        unidadVenta: '500g',
        origen: 'Bolivia',
        fechaCreacion: new Date('2024-02-10')
      },
      {
        id: 5,
        nombre: 'Lentejas Rojas',
        precio: 6200,
        descripcion: 'Lentejas rojas de cocción rápida, ideales para sopas y guisos.',
        propiedadesNutricionales: [
          { nombre: 'Proteína', valor: '24.6', unidad: 'g/100g' },
          { nombre: 'Fibra', valor: '10.7', unidad: 'g/100g' },
          { nombre: 'Folato', valor: '181', unidad: 'mcg/100g' },
          { nombre: 'Hierro', valor: '3.3', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/lentejas-rojas.jpg',
        categoria: CategoriaProducto.LEGUMBRES,
        disponible: false,
        unidadVenta: '500g',
        origen: 'Turquía',
        fechaCreacion: new Date('2024-02-15')
      },
      {
        id: 6,
        nombre: 'Arándanos Deshidratados',
        precio: 15800,
        descripcion: 'Arándanos deshidratados sin azúcar añadida, ricos en antioxidantes.',
        propiedadesNutricionales: [
          { nombre: 'Antioxidantes', valor: 'Alto', unidad: '' },
          { nombre: 'Vitamina C', valor: '9.7', unidad: 'mg/100g' },
          { nombre: 'Fibra', valor: '9.6', unidad: 'g/100g' },
          { nombre: 'Potasio', valor: '85', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/arandanos-deshidratados.jpg',
        categoria: CategoriaProducto.DESHIDRATADOS,
        disponible: true,
        descuento: 15,
        unidadVenta: '250g',
        origen: 'Chile',
        fechaCreacion: new Date('2024-02-20')
      },
      {
        id: 7,
        nombre: 'Semillas de Girasol',
        precio: 7800,
        descripcion: 'Semillas de girasol tostadas sin sal, perfectas para snacks saludables.',
        propiedadesNutricionales: [
          { nombre: 'Vitamina E', valor: '35.2', unidad: 'mg/100g' },
          { nombre: 'Magnesio', valor: '325', unidad: 'mg/100g' },
          { nombre: 'Proteína', valor: '20.8', unidad: 'g/100g' },
          { nombre: 'Ácido fólico', valor: '227', unidad: 'mcg/100g' }
        ],
        imagen: 'assets/images/semillas-girasol.jpg',
        categoria: CategoriaProducto.SEMILLAS_COMESTIBLES,
        disponible: true,
        unidadVenta: '500g',
        origen: 'Argentina',
        fechaCreacion: new Date('2024-02-25')
      },
      {
        id: 8,
        nombre: 'Avena en Hojuelas',
        precio: 4500,
        descripcion: 'Avena en hojuelas premium, ideal para desayunos nutritivos y horneados.',
        propiedadesNutricionales: [
          { nombre: 'Beta-glucano', valor: '4', unidad: 'g/100g' },
          { nombre: 'Proteína', valor: '16.9', unidad: 'g/100g' },
          { nombre: 'Fibra', valor: '10.6', unidad: 'g/100g' },
          { nombre: 'Manganeso', valor: '4.9', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/avena.jpg',
        categoria: CategoriaProducto.GRANOS_CEREALES,
        disponible: true,
        unidadVenta: '1kg',
        origen: 'Canadá',
        fechaCreacion: new Date('2024-03-01')
      }
    ];
  }
}