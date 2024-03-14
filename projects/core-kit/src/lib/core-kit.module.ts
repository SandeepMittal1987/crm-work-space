import { NgModule } from '@angular/core';
import { CoreKitComponent } from './core-kit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './models/widgets/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgOtpInputModule } from 'ng-otp-input';

import { ButtonComponent } from './core/button/button.component';
import { ExtendInputControlComponent } from './core/extend-input-control/extend-input-control.component';
import { InputBoxComponent } from './core/input-box/input-box.component';
import { StaticLabelComponent } from './core/static-label/static-label.component';
import { DropdownListComponent } from './core/dropdown-list/dropdown-list.component';
import { ImageComponent } from './core/image/image.component';
import { CheckboxComponent } from './core/checkbox/checkbox.component';
import { ForgotPasswordComponent } from './models/widgets/forgot-password/forgot-password.component';
import { DynamicLabelComponent } from './core/dynamic-label/dynamic-label.component';
import { LinkComponent } from './core/link/link.component';

@NgModule({
  declarations: [
    CoreKitComponent,
    ButtonComponent,
    HeaderComponent,
    ExtendInputControlComponent,
    InputBoxComponent,
    StaticLabelComponent,
    DropdownListComponent, ImageComponent, CheckboxComponent, ForgotPasswordComponent, DynamicLabelComponent, LinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatInputModule,
    NgOtpInputModule
  ],
  exports: [
    CoreKitComponent,
    ButtonComponent,
    HeaderComponent,
    ExtendInputControlComponent,
    InputBoxComponent,
    StaticLabelComponent,
    DropdownListComponent, ImageComponent, CheckboxComponent, ForgotPasswordComponent, DynamicLabelComponent, LinkComponent
  ],
  providers: [TranslateService],
})
export class CoreKitModule {}
