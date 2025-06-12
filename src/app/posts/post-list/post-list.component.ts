import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    standalone: true,
    imports: [
        MatExpansionModule
    ]
})
export class PostListComponent {
    posts = [
        { title: 'First Post', content: 'This is the first post' },
        { title: 'Second Post', content: 'This is the second post' },
        { title: 'Third Post', content: 'This is the third post' }
    ];
}