import {ChatService, Message} from '../chat.service';
import {Component, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { UserService } from "app/user.service";

@Component({
    selector: 'chat',
    styleUrls: ['./chat.component.css'],
    template: `
        <div class="messages">
            <div *ngFor="let msg of messages;"
                 class="talk-bubble tri-right btm-right"
                 [ngClass]="{'btm-right isOwn': isOwnUser(msg), 'btm-left': !isOwnUser(msg)}"
                 title="user{{msg.author}}">
                <div class="talktext">
                    <p>{{ msg.message }}</p>
                </div>
            </div>
        </div>
    `,
})
export class ChatComponent {
    public messages: Message[] = new Array();

    constructor(private chatService: ChatService) {
        chatService.messages.subscribe(msg => {
            this.messages.push(msg);
        });
    }

    public isOwnUser(message) {
        return message.author === UserService.userId;
    }
}
