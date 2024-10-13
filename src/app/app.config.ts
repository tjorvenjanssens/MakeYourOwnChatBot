import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration} from '@angular/platform-browser';

// Importeer je componenten
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FilesComponent } from './files/files.component';
import { FormsModule } from '@angular/forms';

// Routes configureren
export const routes = [
  { path: 'files', component: FilesComponent }, 
  { path: 'chatbot', component: ChatbotComponent }, 
  {path: '', component: ChatbotComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    FormsModule 
  ]
};
