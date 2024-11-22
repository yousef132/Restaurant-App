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
  localStorage.setItem('lang', selectElement);
  this.translate.use(selectElement);
  this.currentLang = selectElement;
  location.reload();
}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
