import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '../services/chatbot.service';


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput: string = '';
  chatbotResponse: string = '';
  
  constructor(private chatbotService: ChatbotService) {}

  sendMessage(input: string) {
    if(input.trim()) {
      this.chatbotResponse = this.chatbotService.getResponse(input);
      this.userInput = '';
    } else {
      this.chatbotResponse = ''; 
    }
  }
}
