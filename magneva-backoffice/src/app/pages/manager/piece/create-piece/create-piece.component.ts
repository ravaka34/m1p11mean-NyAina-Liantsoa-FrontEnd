import { Component } from '@angular/core';
import { FormPieceComponent } from '../form-piece/form-piece.component';

@Component({
  selector: 'app-create-piece',
  standalone: true,
  imports: [
    FormPieceComponent
  ],
  templateUrl: './create-piece.component.html',
  styleUrl: './create-piece.component.css'
})
export class CreatePieceComponent {
  isCreate: boolean = true;
  titleForm: string = "Nouvelle pièce";
}
