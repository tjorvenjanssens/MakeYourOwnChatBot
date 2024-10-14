import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private blobServiceClient: BlobServiceClient;
  private containerName = 'campagnes';

  constructor() { 
    this.blobServiceClient = new BlobServiceClient('https://dndcampagnes.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=o&sp=wactfx&se=2025-10-13T14:23:08Z&st=2024-10-13T06:23:08Z&spr=https,http&sig=nDevbR%2FmGvZJCCHUtu0xWxwxKvZmngRwOqlWX9sNgl4%3D');
  }

  async uploadFile(file: File): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);

    try {
      const response = await blockBlobClient.upload(file, file.size);
      return 'Upload succesvol: ' + response.requestId;
    } catch (error) {
      throw new Error('Uploaden mislukt: ' + error);
    }
  }

  async listFiles(): Promise<string[]> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobs: string[] = [];
    try {
      for await (const blob of containerClient.listBlobsFlat()) {
        blobs.push(blob.name);
      }
      return blobs;
    } catch (error) {
      throw new Error('Fout bij ophalen van bestanden: ' + error);
    }
  }
}
