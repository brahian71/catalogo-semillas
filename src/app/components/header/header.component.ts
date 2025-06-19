//src/app/components/header/header.component.ts


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private whatsappService: WhatsappService) { }

  // Abrir WhatsApp para consulta general
  contactarWhatsApp(): void {
    this.whatsappService.enviarMensajeConsulta();
  }
}