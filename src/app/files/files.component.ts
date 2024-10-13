import { Component, OnInit } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit {
  file: File | null = null;
  blobs: string[] = [];
  selectedFileName: string | null = null;
  
  constructor() { }

  async ngOnInit() {
    /**
    await this.listFiles(); // Ophalen van bestanden wanneer de pagina laadt
    */
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.selectedFileName = this.file ? this.file.name : null; 
  }

  async uploadFile() {
    if (this.file) {
      const blobServiceClient = new BlobServiceClient('https://dndcampagnes.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=o&sp=wactfx&se=2025-10-13T14:23:08Z&st=2024-10-13T06:23:08Z&spr=https,http&sig=nDevbR%2FmGvZJCCHUtu0xWxwxKvZmngRwOqlWX9sNgl4%3D');
      const containerClient = blobServiceClient.getContainerClient('campagnes');
      const blockBlobClient = containerClient.getBlockBlobClient(this.file.name);

      try {
        await blockBlobClient.uploadBrowserData(this.file);
        console.log('Bestand succesvol geüpload.');
        await this.listFiles(); // Vernieuw de lijst na uploaden
      } catch (error) {
        console.error('Uploaden mislukt: ', error);
      }
    } else {
      console.warn('Geen bestand geselecteerd.');
    }
  }

  async listFiles() {
    const blobServiceClient = new BlobServiceClient('https://dndcampagnes.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=o&sp=rltfx&se=2025-10-13T14:27:38Z&st=2024-10-13T06:27:38Z&spr=https,http&sig=9etNR7AlaPI33v9mHS0whfoDll42V2yFzcXLxm%2BkFKs%3D');
    const containerClient = blobServiceClient.getContainerClient('campagnes');
    try {
      this.blobs = []; // Leeg de lijst voordat je nieuwe bestanden ophaalt
      for await (const blob of containerClient.listBlobsFlat()) {
        this.blobs.push(blob.name);
      }
    } catch (error) {
      console.error('Fout bij ophalen van bestanden: ', error);
    }
  }
}