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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
    CommonModule,
    MatProgressSpinnerModule
]
})
export class PostCreateComponent implements OnInit {
    enteredContent = '';
    enteredTitle = '';
    isLoading = false;
    private mode = 'create';
    private postId: string | null = null;
    private post: Post | null = null;


    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                if (this.postId) {
                    this.postsService.getPost(this.postId).subscribe((post: Post | null) => {
                        this.isLoading = false;
                        if (post) {
                            this.post = post;
                            this.enteredTitle = post.title;
                            this.enteredContent = post.content;
                        }
                    });
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
        this.isLoading = true;
        if (this.mode === "create") {
            this.postsService.addPost(form.value.title, form.value.content);
        } else if (this.postId) {
            this.postsService.updatePost(this.postId, form.value.title, form.value.content);
        }
        form.resetForm();
    }
}