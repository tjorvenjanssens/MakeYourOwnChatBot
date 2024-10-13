import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration} from '@angular/platform-browser';

// Importeer je componenten
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FilesComponent } from './files/files.component';
import { FormsModule } from '@angular/forms';

// Routes configureren
export const routes = [
  { path: 'files', component: FilesComponent }, // Standaard naar bestandsoverzicht
  { path: 'chatbot', component: ChatbotComponent }, // Naar de chatbot
  {path: '', component: ChatbotComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Router-configuratie
    provideClientHydration(), // Zorgt voor ondersteuning van server-side rendering (optioneel)
    FormsModule // FormsModule toevoegen voor ngModel
  ]
};
