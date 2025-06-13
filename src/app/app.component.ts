import { Component } from '@angular/core';
import { Post } from './posts/post-list/post-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  storedPosts: Post[] = [];
  
  onPostAdded(post: Post): void {
    this.storedPosts.push(post);
  }
}