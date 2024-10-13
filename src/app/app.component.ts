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
}

