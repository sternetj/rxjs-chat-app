import {Component} from '@angular/core';
import { UserService, ChatService } from '../services';

@Component({
    selector: 'create-message',
    templateUrl: './create-message.component.html',
    styleUrls: ['./create-message.component.css']
})

export class CreateMessage {
    private submitted = false;
    private typing = false;
    public message = '';

    constructor(private chatService: ChatService) {}

    public onSubmit() {
        this.chatService.messages.next({
            author: UserService.userId,
            message: this.message
        });

        this.message = '';
        this.userIsTyping();
    }

    public userIsTyping() {
        const isTypingNow = this.message !== '';
        if (this.typing !== isTypingNow) {
            this.typing = isTypingNow;
            this.chatService.usersTyping.next({
                author: UserService.userId,
                isTyping: this.typing
            });
        }
    }

    public focus() {
        window.document.body.style.height = window.innerHeight + 'px';
    }

    public blur() {
        window.document.body.style.height = '100vh';
    }
}
