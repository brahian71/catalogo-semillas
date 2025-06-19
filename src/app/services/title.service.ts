import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private readonly baseTitle = 'GranelVerde';
  private readonly baseSuffix = 'Productos Secos a Granel de Calidad';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  // Establecer título de página
  setTitle(pageTitle?: string): void {
    if (pageTitle) {
      this.titleService.setTitle(`${pageTitle} - ${this.baseTitle}`);
    } else {
      this.titleService.setTitle(`${this.baseTitle} - ${this.baseSuffix}`);
    }
  }

  // Establecer descripción meta
  setDescription(description: string): void {
    this.metaService.updateTag({ 
      name: 'description', 
      content: description 
    });
  }

  // Métodos específicos para cada sección
  setHomeTitle(): void {
    this.setTitle();
    this.setDescription('Los mejores productos secos a granel: frutos secos, semillas, granos y alimentos deshidratados. Calidad premium directo a tu mesa.');
  }

  setCatalogoTitle(): void {
    this.setTitle('Catálogo de Productos');
    this.setDescription('Explora nuestro catálogo completo de productos secos a granel: almendras, nueces, quinoa, chía y mucho más.');
  }

  setContactoTitle(): void {
    this.setTitle('Contacto y Ubicación');
    this.setDescription('Contáctanos por WhatsApp o visita nuestro local. Información de ubicación, horarios y formas de contacto.');
  }
}