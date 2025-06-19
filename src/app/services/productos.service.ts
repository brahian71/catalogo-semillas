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

  // Datos de ejemplo para el catálogo
  private obtenerProductosIniciales(): Producto[] {
    return [
      {
        id: 1,
        nombre: 'Semillas de Tomate Cherry',
        precio: 2500,
        descripcion: 'Deliciosas semillas de tomate cherry, perfectas para huertos caseros y jardines pequeños.',
        propiedadesNutricionales: [
          { nombre: 'Vitamina C', valor: '28', unidad: 'mg/100g' },
          { nombre: 'Licopeno', valor: '3', unidad: 'mg/100g' },
          { nombre: 'Potasio', valor: '237', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/tomate-cherry.jpg',
        categoria: CategoriaProducto.HORTALIZAS,
        disponible: true,
        fechaCreacion: new Date('2024-01-15')
      },
      {
        id: 2,
        nombre: 'Semillas de Lechuga Crespa',
        precio: 1800,
        descripcion: 'Semillas de lechuga crespa de rápido crecimiento, ideales para ensaladas frescas.',
        propiedadesNutricionales: [
          { nombre: 'Vitamina K', valor: '126', unidad: 'mcg/100g' },
          { nombre: 'Folato', valor: '38', unidad: 'mcg/100g' },
          { nombre: 'Vitamina A', valor: '370', unidad: 'mcg/100g' }
        ],
        imagen: 'assets/images/lechuga-crespa.jpg',
        categoria: CategoriaProducto.HORTALIZAS,
        disponible: true,
        descuento: 10,
        fechaCreacion: new Date('2024-01-20')
      },
      {
        id: 3,
        nombre: 'Semillas de Albahaca',
        precio: 3200,
        descripcion: 'Aromáticas semillas de albahaca, perfectas para condimentar y para uso medicinal.',
        propiedadesNutricionales: [
          { nombre: 'Vitamina K', valor: '414', unidad: 'mcg/100g' },
          { nombre: 'Hierro', valor: '3.2', unidad: 'mg/100g' },
          { nombre: 'Calcio', valor: '177', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/albahaca.jpg',
        categoria: CategoriaProducto.HIERBAS,
        disponible: true,
        fechaCreacion: new Date('2024-02-01')
      },
      {
        id: 4,
        nombre: 'Semillas de Girasol',
        precio: 4500,
        descripcion: 'Hermosas semillas de girasol que producen flores grandes y brillantes.',
        propiedadesNutricionales: [
          { nombre: 'Vitamina E', valor: '35', unidad: 'mg/100g' },
          { nombre: 'Magnesio', valor: '325', unidad: 'mg/100g' },
          { nombre: 'Proteína', valor: '21', unidad: 'g/100g' }
        ],
        imagen: 'assets/images/girasol.jpg',
        categoria: CategoriaProducto.FLORES,
        disponible: true,
        fechaCreacion: new Date('2024-02-10')
      },
      {
        id: 5,
        nombre: 'Semillas de Zanahoria',
        precio: 2200,
        descripcion: 'Semillas de zanahoria de excelente calidad, ricas en betacarotenos.',
        propiedadesNutricionales: [
          { nombre: 'Betacaroteno', valor: '8285', unidad: 'mcg/100g' },
          { nombre: 'Fibra', valor: '2.8', unidad: 'g/100g' },
          { nombre: 'Potasio', valor: '320', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/zanahoria.jpg',
        categoria: CategoriaProducto.HORTALIZAS,
        disponible: false,
        fechaCreacion: new Date('2024-02-15')
      },
      {
        id: 6,
        nombre: 'Semillas de Cilantro',
        precio: 2800,
        descripcion: 'Semillas frescas de cilantro, esenciales para la cocina colombiana.',
        propiedadesNutricionales: [
          { nombre: 'Vitamina C', valor: '27', unidad: 'mg/100g' },
          { nombre: 'Vitamina K', valor: '310', unidad: 'mcg/100g' },
          { nombre: 'Potasio', valor: '521', unidad: 'mg/100g' }
        ],
        imagen: 'assets/images/cilantro.jpg',
        categoria: CategoriaProducto.HIERBAS,
        disponible: true,
        descuento: 15,
        fechaCreacion: new Date('2024-02-20')
      }
    ];
  }
}