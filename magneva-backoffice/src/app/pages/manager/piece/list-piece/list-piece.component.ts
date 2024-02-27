import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../../../service/page-title.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { PieceService } from '../../../../service/piece.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoaderComponent,
    ErrorComponent
  ],
  templateUrl: './list-piece.component.html',
  styleUrl: './list-piece.component.css',
  providers: [
    PieceService
  ]
})
export class ListPieceComponent extends BodyComponent implements OnInit {

  override title = "Liste";
  pieces: any = [];
  loading: boolean = false;
  error: string = "";

  constructor(
    pageTitleService: PageTitleService, 
    private pieceService: PieceService
  ) {
    super(pageTitleService);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setPageTitleService();
    this.getAllPieces();
  }

  getAllPieces() {
    this.pieceService.getAllPieces().subscribe(
      (data) => {
        this.pieces = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.error.message;
        this.loading = false;
      },
    );
  }

}
