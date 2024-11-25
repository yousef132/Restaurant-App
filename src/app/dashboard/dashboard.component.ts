import { Component } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "../shared/components/header/header.component";
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { NavSideComponent } from './nav-side/nav-side.component';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [NavSideComponent,RouterOutlet] ,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
