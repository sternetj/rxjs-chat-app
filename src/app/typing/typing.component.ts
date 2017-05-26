import {Component, ElementRef} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { UserService, ChatService } from '../services';
import {Message} from '../models';

@Component({
    selector: 'typing',
    styleUrls: ['./typing.component.css'],
    templateUrl: './typing.component.html',
})
export class TypingComponent {
    public show: string[] = [];
    private typings = {};

    constructor(private chatService: ChatService) {
        chatService.usersTyping
        .filter(typing => typing.author !== UserService.userId)
        .subscribe(typer => {
            if (typer.isTyping) {
                this.typings[typer.author] = typer;
            } else {
                delete this.typings[typer.author];
            }

            this.show = Object.keys(this.typings).map((key) => this.typings[key]);
        });
    }

    public getClass(userId: string) {
        return UserService.getColorClass(userId);
    }
}
