import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() categories: any;
  @Output() event = new EventEmitter();
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  selectedCategory: any = null; // To track the active category

  filter(category: any) {
    this.selectedCategory = category; // Set active category
    this.event.emit(category);
  }
  scrollUp() {
    this.scrollContainer.nativeElement.scrollBy({
      top: -50,  // Scroll up by 50px
      behavior: 'smooth'
    });
  }

  scrollDown() {
    this.scrollContainer.nativeElement.scrollBy({
      top: 50,  // Scroll down by 50px
      behavior: 'smooth'
    });
  }
  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollLeft -= 200; // Adjust scroll distance
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollLeft += 200; // Adjust scroll distance
  }
}
