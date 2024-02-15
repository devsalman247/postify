import { Component } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'homepage',
  standalone: true,
  imports: [PostsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
