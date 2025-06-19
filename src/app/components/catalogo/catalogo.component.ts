//src/app/components/catalogo/catalogo.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Producto, CategoriaProducto } from '../../models/producto';
import { ProductosService } from '../../services/productos.service';
import { ProductoCardComponent } from '../producto-card/producto-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  productos$: Observable<Producto[]>;
  categorias = Object.values(CategoriaProducto);
  categoriaSeleccionada: CategoriaProducto | 'todas' = 'todas';

  constructor(private productosService: ProductosService) {
    this.productos$ = this.productosService.getProductos();
  }

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  // Filtrar productos por categoría
  filtrarPorCategoria(categoria: CategoriaProducto | 'todas'): void {
    this.categoriaSeleccionada = categoria;
    
    if (categoria === 'todas') {
      this.productos$ = this.productosService.getProductos();
    } else {
      this.productos$ = this.productosService.getProductosPorCategoria(categoria);
    }
  }

  // Capitalizar primera letra para mostrar en UI
  capitalizarTexto(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  // Track by function para optimizar ngFor
  trackByProductoId(index: number, producto: Producto): number {
    return producto.id;
  }
}