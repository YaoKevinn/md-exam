import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _allPosts = new BehaviorSubject<Post[]>([]);

  constructor(private apiService: ApiService) {
    this.initialize();
  }

  get allPosts() {
    return this._allPosts;
  }

  initialize() {
    this.apiService.getAllPosts().subscribe(posts => {
        this._allPosts.next(posts);
    });
  }

  getCommentsById(id: number) {
    const obs = this.apiService.getCommentsById(id);
    return obs;
  }


}
