//src/app/components/producto-card/producto-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { WhatsappService } from '../../services/whatsapp.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;

  cantidadSeleccionada: number = 1;
  mostrandoSelector: boolean = false;
  agregandoAlCarrito: boolean = false;

  constructor(
    private whatsappService: WhatsappService,
    private carritoService: CarritoService
  ) {}

  get precioConDescuento(): number {
    if (this.producto.descuento) {
      return this.producto.precio * (1 - this.producto.descuento / 100);
    }
    return this.producto.precio;
  }

  consultarProducto(): void {
    this.whatsappService.consultarProducto(this.producto);
  }

  get categoriaCapitalizada(): string {
    return this.producto.categoria.charAt(0).toUpperCase() + 
           this.producto.categoria.slice(1);
  }

  // ===== FUNCIONALIDADES DEL CARRITO =====

  mostrarSelector(): void {
    if (this.producto.disponible) {
      this.mostrandoSelector = true;
      this.cantidadSeleccionada = 1;
    }
  }

  ocultarSelector(): void {
    this.mostrandoSelector = false;
    this.cantidadSeleccionada = 1;
  }

  agregarAlCarrito(): void {
    if (!this.producto.disponible) return;

    this.agregandoAlCarrito = true;

    const exito = this.carritoService.agregarProducto(this.producto, this.cantidadSeleccionada);

    if (exito) {
      setTimeout(() => {
        this.agregandoAlCarrito = false;
        this.ocultarSelector();
      }, 800);
    } else {
      this.agregandoAlCarrito = false;
    }
  }
  get estaEnCarrito(): boolean {
    return this.carritoService.productoEnCarrito(this.producto.id);
  }
  get cantidadEnCarrito(): number {
    return this.carritoService.obtenerCantidadProducto(this.producto.id);
  }
  incrementarCantidad(): void {
    if (this.cantidadSeleccionada < 10) {
      this.cantidadSeleccionada++;
    }
  }
  decrementarCantidad(): void {
    if (this.cantidadSeleccionada > 1) {
      this.cantidadSeleccionada--;
    }
  }
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder-semilla.svg';
  }
}