import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ChatService, WebSocketService} from './services';
import {ChatComponent} from './chat/chat.component';
import {CreateMessage} from './create-message/create-message.component';
import {TypingComponent} from './typing/typing.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateMessage,
    TypingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ChatService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
