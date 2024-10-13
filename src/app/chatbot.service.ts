import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  userInput: string = '';
  chatbotResponse: string = '';
  oldChatbotResponse: string = '';
  numerOfInput: number = 0;
  
  
  constructor() { }

  getResponse(input: string) : string {
      this.numerOfInput = this.numerOfInput + 1;
      this.chatbotResponse = this.oldChatbotResponse + '<b>Vraag </b>' + this.numerOfInput + ': ' + input + '<br><b>Chatbot</b>: testantwoord ' + this.numerOfInput +'<br><br>';
      this.oldChatbotResponse = this.chatbotResponse;
      this.userInput = '';
      return this.chatbotResponse;
  }
}
