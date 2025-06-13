import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface Post {
  title: string;
  content: string;
}

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class PostCreateComponent {
    enteredContent = '';
    enteredTitle = '';

    @Output() postCreated = new EventEmitter<Post>();
    
    onAddPost(): void {
        const post: Post = {
            title: this.enteredTitle,
            content: this.enteredContent
        };
        this.postCreated.emit(post);
        this.enteredTitle = '';
        this.enteredContent = '';
    }
}