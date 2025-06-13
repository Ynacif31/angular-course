import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

export interface Post {
  title: string;
  content: string;
}

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
   //posts = [
        //{ title: 'First Post', content: 'This is the first post' },
        //{ title: 'Second Post', content: 'This is the second post' },
        //{ title: 'Third Post', content: 'This is the third post' }
    //];
}