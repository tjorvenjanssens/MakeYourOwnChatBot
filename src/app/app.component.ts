import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlobServiceClient } from '@azure/storage-blob';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MYOCB - Make Your Own ChatBot';

  file: File | null = null;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(this.file != null)
    {
      console.log('Geselecteerd bestand:', this.file.name);
    }
  }

  async uploadFile() {
    if (this.file) {
      const blobServiceClient = new BlobServiceClient('https://dndcampagnes.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2025-10-12T16:43:22Z&st=2024-10-12T08:43:22Z&spr=https,http&sig=O84sBlcNzHryeCC5RpTTNEaduZxkRSNLtG6zfSnwf5s%3D');
      const containerClient = blobServiceClient.getContainerClient('campagnes');
      const blockBlobClient = containerClient.getBlockBlobClient(this.file.name);

      try {
        await blockBlobClient.uploadBrowserData(this.file);
        console.log('Bestand succesvol geüpload.');
      } catch (error) {
        console.error('Uploaden mislukt: ', error);
      }
    } else {
      console.warn('Geen bestand geselecteerd.');
    }
  }

  userInput: string = '';
  chatbotResponse: string = '';

  sendMessage() {
    // Hier kun je logica toevoegen om de chatbot te laten antwoorden
    this.chatbotResponse = `Chatbot zegt: "Je hebt gezegd: ${this.userInput}"`;
    this.userInput = ''; 
  }
}

