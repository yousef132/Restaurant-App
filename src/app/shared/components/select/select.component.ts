import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input()title:string='';
  @Input()categories:any;
  @Output() event = new EventEmitter();

  filter(category:any){
    console.log(category);
    console.log("++++++++++")
    this.event.emit(category);
  }
}
