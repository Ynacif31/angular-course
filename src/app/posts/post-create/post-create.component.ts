import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from '../posts.service';

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


    constructor(public postsService: PostsService) {}
    
    onAddPost(form: NgForm): void {
        if (form.invalid) {
            return;
        }
        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}