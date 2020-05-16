import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudFireBase';

  constructor(
    private route:Router,
    private translate: TranslateService){
      translate.setDefaultLang('en');
  }
  
  switchLanguage(language: string) {
    if(!isNullOrUndefined(language)){
      this.translate.use(language);
    }
  }

  logout(){
    this.route.navigate['login'];
  }
}
