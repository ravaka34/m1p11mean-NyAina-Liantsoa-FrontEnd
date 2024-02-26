import { Component } from '@angular/core';
import { FormServiceComponent } from '../form-service/form-service.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormServiceComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent{

  isCreate: boolean = true;
  titleForm: string = "Nouveau service";

}
