import { Component, OnInit } from '@angular/core';
import { BodyComponent } from '../../../body/body.component';
import { PageTitleService } from '../../../../service/page-title.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../../template/error/error.component';
import { SuccessComponent } from '../../../../template/success/success.component';
import { LoaderComponent } from '../../../../template/loader/loader.component';
import { ServiceService } from '../../../../service/service.service';
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
