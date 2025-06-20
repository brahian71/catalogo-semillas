//src/app/components/mini-carrito/mini-carrito.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { Carrito, ResumenCarrito } from '../../models/producto';

@Component({
  selector: 'app-mini-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-carrito.component.html',
  styleUrls: ['./mini-carrito.component.scss'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MiniCarritoComponent implements OnInit {
  carrito$: Observable<Carrito>;
  resumen$: Observable<ResumenCarrito>;
  mostrandoDropdown: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private whatsappService: WhatsappService
  ) {
    this.carrito$ = this.carritoService.carrito$;
    this.resumen$ = this.carritoService.resumenCarrito;
  }

  ngOnInit(): void {}
  toggleDropdown(): void {
    this.mostrandoDropdown = !this.mostrandoDropdown;
  }
  cerrarDropdown(): void {
    this.mostrandoDropdown = false;
  }
  eliminarProducto(productoId: number): void {
    this.carritoService.eliminarProducto(productoId);
  }
  actualizarCantidad(productoId: number, nuevaCantidad: number): void {
    this.carritoService.actualizarCantidad(productoId, nuevaCantidad);
  }
  vaciarCarrito(): void {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
      this.cerrarDropdown();
    }
  }
  consultarPedido(): void {
    const mensaje = this.carritoService.generarMensajeWhatsApp();
    this.whatsappService.enviarMensajePedido(mensaje);
    this.cerrarDropdown();
  }

  obtenerResumenTexto(): string {
    return this.carritoService.obtenerResumenTexto();
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const miniCarrito = target.closest('.mini-carrito');
    
    if (!miniCarrito && this.mostrandoDropdown) {
      this.cerrarDropdown();
    }
  }
  trackByItemId(index: number, item: any): number {
    return item.producto.id;
  }
}