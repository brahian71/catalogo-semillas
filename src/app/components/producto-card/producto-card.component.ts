//src/app/components/producto-card/producto-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;

  constructor(private whatsappService: WhatsappService) {}

  // Calcular precio con descuento
  get precioConDescuento(): number {
    if (this.producto.descuento) {
      return this.producto.precio * (1 - this.producto.descuento / 100);
    }
    return this.producto.precio;
  }

  // Consultar producto por WhatsApp
  consultarProducto(): void {
    this.whatsappService.consultarProducto(this.producto);
  }

  // Capitalizar categoría para mostrar
  get categoriaCapitalizada(): string {
    return this.producto.categoria.charAt(0).toUpperCase() + 
           this.producto.categoria.slice(1);
  }

  // Manejar error de imagen
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder-semilla.svg';
  }
}