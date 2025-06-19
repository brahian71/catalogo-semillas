//src/app/components/contacto/contacto.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  constructor(private whatsappService: WhatsappService) { }

  contactarWhatsApp(): void {
    this.whatsappService.enviarMensajeConsulta();
  }

  consultarUbicacion(): void {
    this.whatsappService.consultarUbicacion();
  }
}