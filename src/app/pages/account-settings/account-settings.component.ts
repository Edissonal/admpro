import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  public  links:NodeListOf<Element> ;
  constructor(private settingsService:SettingsService ) {

    console.log(this.links);
   }

  ngOnInit(): void {
    
    this.settingsService.checkCurrentTheme();
  }


  changeTheme(theme: string) {
    
    //console.log(theme);

    this.settingsService.changeTheme(theme);

  }



}
