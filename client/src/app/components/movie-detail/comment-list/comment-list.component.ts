import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
@Input() movieId: string;

 content:string;
 comments:[];
  constructor(private commentService: CommentService) { }

  ngOnInit() {
    const variables = {

      movieId: this.movieId
  };
    this.commentService.getComments(variables).subscribe((comments) => {
      console.log(comments);
      this.comments = comments.comments;
    });

  }

  onSubmit(form: NgForm){
    console.log(form.form.valid);
    if(form.form.valid){
      const variables = {
        content: form.form.value.content,
        writer: JSON.parse(localStorage.getItem('userData')).id ,
        postId: this.movieId
    };

      console.log(variables);
      this.commentService.saveComment(variables).subscribe((comments) => {
        console.log(comments);
      });

      form.reset();
    }
    this.ngOnInit()

  }

}
