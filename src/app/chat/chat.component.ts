import {Component, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {UserService, ChatService} from '../services';
import {Message} from '../models';

@Component({
    selector: 'chat',
    styleUrls: ['./chat.component.css'],
    templateUrl: './chat.component.html'
})
export class ChatComponent {
    public messages: Message[] = new Array();

    constructor(private chatService: ChatService) {
        chatService.messages.subscribe(msg => {
            this.messages.push(msg);
        });
    }

    public isOwnUser(userId: string) {
        return userId === UserService.userId;
    }

    public getClasses(userId: string) {
        return UserService.getColorClass(userId) + (this.isOwnUser(userId) ? ' btm-right isOwn' : ' btm-left');
    }
}
