import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
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
  uploadStatus: string | null = null;

  
  constructor(private fileService: FileService) { }

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
      try {
        this.uploadStatus = await this.fileService.uploadFile(this.file);
       
      } catch (error) {
        this.uploadStatus = 'Fout bij opladen: ' + error;
      }
    } else {
      this.uploadStatus = 'Geen bestand geselecteerd.';
    }
  }

  async listFiles() {
    try {
      this.blobs = await this.fileService.listFiles();
    } catch (error) {
      console.error(error);
    }
  }
}
