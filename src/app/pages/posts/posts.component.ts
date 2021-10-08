import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  allPosts: Post[] = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.allPosts.subscribe(posts => {
      // Tabla con registros de 10 registros
      this.allPosts = posts.slice(0, 10);
    });
  }

  goToDetailPage(post: Post) {
    this.router.navigateByUrl(`/post/${post.id}`, {
      state: {
        post
      }
    });
  }
}
