import { Navigation } from "@angular/router";
import { Button, Header, StaticLabelControl } from "projects/core-kit/src/public-api";

export class AppComponentModel {
    loginCTA = new Button("LABELS.SEARCH");
    supportEmail = new StaticLabelControl('supportEmail','LABELS.SUPPORTEMAIL', 'email');
    supportMobile = new StaticLabelControl('supportMobile','LABELS.SUPPORTEMOBILE', 'mobile');
    header:Header;
    navigation: Navigation;
    // menus: MenuItem[]= [];
    // footer: Footer;
    authrizedRoutes: string [] =[];
    constructor(){
        this.loginCTA.customCssClass = 'templateButtonColor';
    }
}
