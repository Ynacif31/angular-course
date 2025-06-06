import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class PostCreateComponent {

    enteredValue = '';
    newPost = 'NO CONTENT';

    onAddPost() {
        this.newPost = this.enteredValue;
    }
}