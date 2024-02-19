import { Component, Input } from '@angular/core';
import { BreadcrumbChild } from '../../interface/breadcrumbchild';

@Component({
  selector: 'app-breadcrum-child',
  standalone: true,
  imports: [],
  templateUrl: './breadcrum-child.component.html',
  styleUrl: './breadcrum-child.component.css'
})
export class BreadcrumChildComponent {
  @Input() info!: BreadcrumbChild;
}
