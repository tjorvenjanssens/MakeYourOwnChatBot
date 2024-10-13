import { Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  { path: 'files', component: FilesComponent },  
  { path: 'chatbot', component: ChatbotComponent }, 
  { path: '', redirectTo: '/chatbot', pathMatch: 'full' },
  { path: '**', redirectTo: '/chatbot' } 
];