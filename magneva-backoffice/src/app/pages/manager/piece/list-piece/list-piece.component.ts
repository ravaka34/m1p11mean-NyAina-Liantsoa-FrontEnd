import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ErrorComponent } from '../../../../template/error/error.component';
import { BodyComponent } from '../../../../component/body/body.component';
import { PieceService } from '../../../../service/piece.service';
import { LoaderService } from '../../../../service/loader.service';

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
  error: string = "";

  constructor() {super();}

  pieceService: PieceService = inject(PieceService)
  loaderService : LoaderService = inject(LoaderService);

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.setPageTitleService();
    this.getAllPieces();
  }

  getAllPieces() {
    this.pieceService.getAllPieces().subscribe(
      (data) => {
        this.pieces = data;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.error = error.error.message;
      },
    );
  }

}
