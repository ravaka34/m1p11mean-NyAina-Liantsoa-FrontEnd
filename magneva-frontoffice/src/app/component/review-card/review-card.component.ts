import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input()review: any;
  @Input() updatable: boolean = false;
  dialog: MatDialog = inject(MatDialog);

  openUpdateReviewDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.review;
    this.dialog.open(AddReviewComponent, dialogConfig);
  }
}
