//src/app/services/whatsapp.service.ts

import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  // Número de WhatsApp del negocio (reemplaza con tu número real)
  private numeroWhatsapp = '573XXXXXXXXX'; // Formato: código país + número sin + (reemplaza las X con tu número)
  
  constructor() { }

  // Enviar mensaje de consulta general
  enviarMensajeConsulta(): void {
    const mensaje = '¡Hola! Me interesa conocer más sobre sus productos secos a granel. ¿Podrían brindarme información sobre frutos secos, granos y semillas disponibles?';
    this.abrirWhatsApp(mensaje);
  }

  // Enviar consulta sobre un producto específico
  consultarProducto(producto: Producto): void {
    const mensaje = `¡Hola! Me interesa el producto: *${producto.nombre}*
    
💰 Precio: $${producto.precio.toLocaleString()}
📝 Descripción: ${producto.descripcion}

¿Está disponible? ¿Podrían darme más información?`;
    
    this.abrirWhatsApp(mensaje);
  }

  // Enviar mensaje de pedido
  realizarPedido(productos: {producto: Producto, cantidad: number}[]): void {
    let mensaje = '¡Hola! Me gustaría realizar el siguiente pedido:\n\n';
    
    let total = 0;
    productos.forEach((item, index) => {
      const subtotal = item.producto.precio * item.cantidad;
      total += subtotal;
      mensaje += `${index + 1}. *${item.producto.nombre}*\n`;
      mensaje += `   Cantidad: ${item.cantidad}\n`;
      mensaje += `   Precio unitario: $${item.producto.precio.toLocaleString()}\n`;
      mensaje += `   Subtotal: $${subtotal.toLocaleString()}\n\n`;
    });
    
    mensaje += `💰 *Total: $${total.toLocaleString()}*\n\n`;
    mensaje += '¿Podrían confirmar disponibilidad y forma de pago?';
    
    this.abrirWhatsApp(mensaje);
  }

  // Enviar consulta sobre ubicación
  consultarUbicacion(): void {
    const mensaje = 'Hola, me gustaría conocer la ubicación de su tienda de productos secos a granel. ¿Podrían compartir la dirección y horarios de atención?';
    this.abrirWhatsApp(mensaje);
  }

  // Método privado para abrir WhatsApp
  private abrirWhatsApp(mensaje: string): void {
    const mensajeEncoded = encodeURIComponent(mensaje);
    const url = `https://wa.me/${this.numeroWhatsapp}?text=${mensajeEncoded}`;
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
  }

  // Obtener enlace de WhatsApp (útil para mostrar en botones)
  obtenerEnlaceWhatsApp(): string {
    return `https://wa.me/${this.numeroWhatsapp}`;
  }

  // Actualizar número de WhatsApp
  actualizarNumero(nuevoNumero: string): void {
    this.numeroWhatsapp = nuevoNumero;
  }
}