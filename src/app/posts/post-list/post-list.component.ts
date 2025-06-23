import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    standalone: true,
    imports: [
        MatExpansionModule,
        CommonModule
    ]
})
export class PostListComponent {
    @Input() posts: Post[] = [];

    constructor(public postsService: PostsService) {
        this.posts = this.postsService.getPosts();
    }
}