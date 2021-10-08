import { PostComment } from './../../models/PostComment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() id: number = 0;
  @Output() dateEvent: EventEmitter<string> = new EventEmitter();

  allComments: PostComment[] = [];

  newCommentTextLength: number = 0;

  nameControl: FormControl = new FormControl('', [Validators.required]);
  mailControl: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  commentControl: FormControl = new FormControl('', [Validators.required]);

  showError: boolean = false;
  errorMessage: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getCommentsById(this.id).subscribe(data => {
      this.allComments = data;
    });
    this.commentControl.valueChanges.subscribe(value => {
      this.newCommentTextLength = value.length;
    })
  }

  setDate() {
    const todayDate = new Date().toLocaleDateString();
    this.dateEvent.emit(todayDate);
  }

  checkAddCommentBtnAvailability() {
    return (
      this.nameControl.valid &&
      this.mailControl.valid &&
      this.commentControl.valid
    )
  }

  removeComment(id: number) {
    this.allComments = this.allComments.filter(c => c.id !== id);
  }

  addComment() {
    this.showError = false;
    if (!this.checkAddCommentBtnAvailability()) {
      this.showError = true;
      if (!this.nameControl.valid) {
        this.errorMessage = 'Ingrese un nombre válido';
      } else if (!this.mailControl.valid) {
        this.errorMessage = 'Ingrese un mail válido';
      } else if (!this.commentControl.valid) {
        this.errorMessage = 'Ingrese un comentario válido';
      }
    } else {
      const commentObject = {
        name: this.nameControl.value,
        email: this.mailControl.value,
        body: this.commentControl.value,
        postId: this.id,
        id: this.allComments.length,
        removable: true,
      }
      this.allComments.push(commentObject);
    }
  }
}
