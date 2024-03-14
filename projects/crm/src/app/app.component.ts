import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppComponentModel } from './app.component.model';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { UiMessageService } from './core/services/ui-message-service/ui-message.service';
import { AuthServiceService } from './core/services/auth-service/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from './core/services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'crm';
  constructor(
    public translate: TranslateService,
    private router: Router,
    private appConfigService: AppConfigService,
    private UiMessage: UiMessageService,
    private authService: AuthServiceService,
    public dialog: MatDialog
  ){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.setPageTitle(event.url);
      }
    })
  };

  setPageTitle(routeName: string):void{
    let tempRouteName = routeName;
    
  }

  ngOnInit(): void{
    // this.crm.header.userName = this.appConfigService.LOGIN_USER;
    this.changeLanguage('en');
    // this.authService.getAuthMetadata().subscribe(res =>{
    //   if(Object.keys(res.roles.screens).length === 0){
    //     this.UiMessage.error('UNAUTHORIZEDACCESS');
    //   }
    //   if(res.roles.screens){
    //     // this.crm.menuAuthorization(res.roles.screens);
    //     // this.setDefaultRoute();
    //   }
    // })
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    // //  this.crm.header.isExpandMenu = false;
    //  this.toggleMenu(false); 
    // });
  }

  toggleMenu(isExpand):void{
    // this.crm.navigation.isExpand = isExpand; // need to uncomment
  }

  changeLanguage(lang:string): void{
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

    //document.getElementById('CRMPage').setAttribute('dir','ltr');

  }



}
