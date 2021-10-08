import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  postId: number = 0;
  post: any;
  currentDate: any = undefined;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.post = window.history.state.post;
    this.activatedRoute.params.subscribe((params) => {
      if (params.id && !isNaN(+params.id)) {
        this.postId = +params.id;
      } else {
        // Si el id de param no es un numero, redirigir a 404. EJ: /post/abcd
        this.router.navigate(['/404']);
      }
    })
    if (!this.post) {
      // Ingresando directamente desde url y no por el boton de "ver"
      // EJ: /post/5
      this.postService.allPosts.subscribe(posts => {
        this.post = posts.filter(p => p.id === this.postId)[0];
      })
    }
  }

  setCurrentDate(date: string) {
    this.currentDate = date;
  }
}
