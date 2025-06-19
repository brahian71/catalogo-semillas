//src/app/components/hero-section/hero-section.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {

  constructor(private whatsappService: WhatsappService) { }

  contactarWhatsApp(): void {
    this.whatsappService.enviarMensajeConsulta();
  }
}
