import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    standalone: true,
    imports: [
        MatExpansionModule,
        MatButtonModule,
        CommonModule,
        RouterModule
    ]
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    private postsSub: Subscription = new Subscription();
    constructor(public postsService: PostsService) {}

    ngOnInit(): void {
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostsUpdatedListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
    }

    ngOnDestroy(): void {
        this.postsSub.unsubscribe();
    }

    onDelete(postId: string) {
        if (!postId) {
            console.log('Post id is required');
            return;
        }

        this.postsService.deletePost(postId)
        .subscribe(() => {
            // Lista atualizada automaticamente pelo serviço
        }, (error) => {
            console.log(error.error.message);
        });
    }
}
