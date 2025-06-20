import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, CarritoItem, Carrito, ResumenCarrito } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly STORAGE_KEY = 'granelverde_carrito';
  private carritoSubject = new BehaviorSubject<Carrito>(this.obtenerCarritoInicial());
  public carrito$ = this.carritoSubject.asObservable();

  constructor() {
    // Cargar carrito desde localStorage al inicializar
    this.cargarCarritoDesdeStorage();
  }

  // ===== GETTERS =====
  
  get carritoActual(): Carrito {
    return this.carritoSubject.value;
  }

  get resumenCarrito(): Observable<ResumenCarrito> {
    return new BehaviorSubject({
      cantidadTotalItems: this.carritoActual.cantidadItems,
      cantidadTiposProductos: this.carritoActual.items.length,
      total: this.carritoActual.total,
      hayItems: this.carritoActual.items.length > 0
    }).asObservable();
  }

  // ===== OPERACIONES PRINCIPALES =====

  // Agregar producto al carrito
  agregarProducto(producto: Producto, cantidad: number = 1): boolean {
    if (!producto.disponible || cantidad <= 0) {
      return false;
    }

    const carrito = this.carritoActual;
    const itemExistente = carrito.items.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      // Si ya existe, actualizar cantidad
      itemExistente.cantidad += cantidad;
      itemExistente.subtotal = this.calcularSubtotal(itemExistente.producto, itemExistente.cantidad);
    } else {
      // Si no existe, crear nuevo item
      const nuevoItem: CarritoItem = {
        producto,
        cantidad,
        subtotal: this.calcularSubtotal(producto, cantidad)
      };
      carrito.items.push(nuevoItem);
    }

    this.actualizarCarrito(carrito);
    return true;
  }

  // Actualizar cantidad de un producto
  actualizarCantidad(productoId: number, nuevaCantidad: number): boolean {
    if (nuevaCantidad < 0) return false;

    const carrito = this.carritoActual;
    const item = carrito.items.find(item => item.producto.id === productoId);

    if (!item) return false;

    if (nuevaCantidad === 0) {
      // Si la cantidad es 0, eliminar el item
      return this.eliminarProducto(productoId);
    }

    item.cantidad = nuevaCantidad;
    item.subtotal = this.calcularSubtotal(item.producto, nuevaCantidad);
    
    this.actualizarCarrito(carrito);
    return true;
  }

  // Eliminar producto del carrito
  eliminarProducto(productoId: number): boolean {
    const carrito = this.carritoActual;
    const indiceItem = carrito.items.findIndex(item => item.producto.id === productoId);

    if (indiceItem === -1) return false;

    carrito.items.splice(indiceItem, 1);
    this.actualizarCarrito(carrito);
    return true;
  }

  // Vaciar carrito completo
  vaciarCarrito(): void {
    const carritoVacio: Carrito = {
      items: [],
      total: 0,
      cantidadItems: 0,
      fechaActualizacion: new Date()
    };
    
    this.actualizarCarrito(carritoVacio);
  }

  // Verificar si un producto está en el carrito
  productoEnCarrito(productoId: number): boolean {
    return this.carritoActual.items.some(item => item.producto.id === productoId);
  }

  // Obtener cantidad de un producto en el carrito
  obtenerCantidadProducto(productoId: number): number {
    const item = this.carritoActual.items.find(item => item.producto.id === productoId);
    return item ? item.cantidad : 0;
  }

  // ===== CÁLCULOS =====

  private calcularSubtotal(producto: Producto, cantidad: number): number {
    const precioFinal = producto.descuento 
      ? producto.precio * (1 - producto.descuento / 100)
      : producto.precio;
    
    return precioFinal * cantidad;
  }

  private calcularTotales(carrito: Carrito): void {
    carrito.total = carrito.items.reduce((total, item) => total + item.subtotal, 0);
    carrito.cantidadItems = carrito.items.reduce((total, item) => total + item.cantidad, 0);
    carrito.fechaActualizacion = new Date();
  }

  // ===== GESTIÓN DE PERSISTENCIA =====

  private actualizarCarrito(carrito: Carrito): void {
    this.calcularTotales(carrito);
    this.carritoSubject.next(carrito);
    this.guardarCarritoEnStorage(carrito);
  }

  private guardarCarritoEnStorage(carrito: Carrito): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carrito));
    } catch (error) {
      console.warn('No se pudo guardar el carrito en localStorage:', error);
    }
  }

  private cargarCarritoDesdeStorage(): void {
    try {
      const carritoGuardado = localStorage.getItem(this.STORAGE_KEY);
      if (carritoGuardado) {
        const carrito: Carrito = JSON.parse(carritoGuardado);
        
        // Validar que el carrito no sea muy antiguo (7 días)
        const fechaActualizacion = new Date(carrito.fechaActualizacion);
        const diasTranscurridos = (Date.now() - fechaActualizacion.getTime()) / (1000 * 60 * 60 * 24);
        
        if (diasTranscurridos < 7) {
          // Recalcular totales por si cambió algo
          this.calcularTotales(carrito);
          this.carritoSubject.next(carrito);
        } else {
          // Si es muy antiguo, limpiar carrito
          this.vaciarCarrito();
        }
      }
    } catch (error) {
      console.warn('Error al cargar carrito desde localStorage:', error);
      this.vaciarCarrito();
    }
  }

  private obtenerCarritoInicial(): Carrito {
    return {
      items: [],
      total: 0,
      cantidadItems: 0,
      fechaActualizacion: new Date()
    };
  }

  // ===== UTILIDADES =====

  // Obtener resumen para mostrar en UI
  obtenerResumenTexto(): string {
    const carrito = this.carritoActual;
    if (carrito.items.length === 0) {
      return 'Carrito vacío';
    }

    const cantidadTipos = carrito.items.length;
    const cantidadTotal = carrito.cantidadItems;
    
    if (cantidadTipos === 1) {
      return `${cantidadTotal} ${cantidadTotal === 1 ? 'producto' : 'productos'}`;
    } else {
      return `${cantidadTipos} tipos (${cantidadTotal} productos)`;
    }
  }

  // Generar mensaje para WhatsApp
  generarMensajeWhatsApp(): string {
    const carrito = this.carritoActual;
    
    if (carrito.items.length === 0) {
      return '¡Hola! Me gustaría conocer más sobre sus productos disponibles.';
    }

    let mensaje = '¡Hola! Me gustaría realizar el siguiente pedido:\n\n';
    
    carrito.items.forEach((item, index) => {
      const descuento = item.producto.descuento ? ` (${item.producto.descuento}% desc.)` : '';
      
      mensaje += `${index + 1}. *${item.producto.nombre}*\n`;
      mensaje += `   Cantidad: ${item.cantidad} × ${item.producto.unidadVenta}\n`;
      mensaje += `   Precio unitario: $${item.producto.precio.toLocaleString()}${descuento}\n`;
      mensaje += `   Subtotal: $${item.subtotal.toLocaleString()}\n\n`;
    });
    
    mensaje += `💰 *Total estimado: $${carrito.total.toLocaleString()}*\n\n`;
    mensaje += '¿Podrían confirmar disponibilidad, precio final y formas de pago/entrega?';
    
    return mensaje;
  }
}