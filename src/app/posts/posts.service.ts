import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPostsUpdatedListener() {
        return this.postsUpdated.asObservable();
    }

    getPosts() {
       this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
       .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
       });
    }

    addPost(title: string, content: string) {
        const post: Post = { id: '', title, content };
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }
}