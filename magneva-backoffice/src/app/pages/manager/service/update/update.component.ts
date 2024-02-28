import { Component } from '@angular/core';
import { FormServiceComponent } from '../form-service/form-service.component';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormServiceComponent
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent{

  isCreate: boolean = false;
  titleForm: string = "Modifier service";

}
