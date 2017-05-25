import {ChatService} from './chat.service'
import {Component} from '@angular/core';
import { UserService } from "app/user.service";

@Component({
    selector: 'create-message',
    template: `
        <form #sendMsg="ngForm" (ngSubmit)="onSubmit()" autocomplete="off">
            <div class="input-group col-xs-8">
                <input
                    [(ngModel)]="message"
                    (input)="userIsTyping()"
                    (keypress.enter)="onSubmit()"
                    name="message"
                    ngControl="msg"
                    required
                    type="text"
                    style="width: 226px;"
                    class="form-control"
                    autofocus
                    placeholder="enter a message...">
            </div>
        </form>
    `
})

export class CreateMessage {
    private submitted = false;
    private typing = false;
    public message = '';

    constructor(private chatService: ChatService) {}

    private onSubmit() {
        this.chatService.messages.next({
            author: UserService.userId,
            message: this.message
        });

        this.message = '';
        this.userIsTyping();
    }

    private userIsTyping() {
        const isTypingNow = this.message !== '';
        if (this.typing !== isTypingNow) {
            this.typing = isTypingNow;
            this.chatService.usersTyping.next({
                author: UserService.userId,
                isTyping: this.typing
            });
        }
    }
}
