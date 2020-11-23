import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { AppMaterialModule} from './app-material.module';
import { ToastContainerModule,ToastrModule,Overlay,OverlayContainer } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/service/app.service';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ListUserComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [Overlay,OverlayContainer,ToastrService,AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
