import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        CommonModule
    ]
})
export class PostCreateComponent implements OnInit {
    enteredContent = '';
    enteredTitle = '';
    private mode = 'create';
    private postId: string | null = null;
    private post: Post | null = null;


    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                if (this.postId) {
                    this.post = this.postsService.getPost(this.postId);
                    if (this.post) {
                        this.enteredTitle = this.post.title;
                        this.enteredContent = this.post.content;
                    }
                }
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost(form: NgForm): void {
        if (form.invalid) {
            return;
        }
        if (this.mode === "create") {
            this.postsService.addPost(form.value.title, form.value.content);
        } else if (this.postId) {
            this.postsService.updatePost(this.postId, form.value.title, form.value.content);
        }
        form.resetForm();
    }
}