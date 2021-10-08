import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { PostComment } from './../models/PostComment';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getAllPosts() {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get<Post[]>(this.baseUrl + '/posts', { headers }).pipe(share());
  }

  getCommentsById(id: number) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get<PostComment[]>(this.baseUrl + `/comments?postId=${id}`, { headers }).pipe(share());
  }
}
