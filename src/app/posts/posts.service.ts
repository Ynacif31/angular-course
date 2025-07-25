import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

interface PostResponse {
    _id: string;
    title: string;
    content: string;
}

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
       this.http.get<{message: string, posts: PostResponse[]}>('http://localhost:3000/api/posts')
       .pipe(map(
        (postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }
       ))
       .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
       });
    }

    addPost(title: string, content: string) {
        const post: Post = { id: '', title, content };
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }

    deletePost(postId: string) {
        return this.http.delete(`http://localhost:3000/api/posts/${postId}`)
        .pipe(
            tap(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            })
        );
    }
}