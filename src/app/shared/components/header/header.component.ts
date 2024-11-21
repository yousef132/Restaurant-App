import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,TranslateModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen = false;
  currentLang: string ;
  selectedLang!: string;
constructor(public translate:TranslateService) {
  this.currentLang = localStorage.getItem('lang') || 'en';
  translate.use(this.currentLang);
}
changeLang(lang: any) {

  const selectElement = lang.target.value;
  console.log(selectElement);
  console.log("selectElement");

  this.translate.use(selectElement);
  this.currentLang = selectElement;

  localStorage.setItem('lang', selectElement);
}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
