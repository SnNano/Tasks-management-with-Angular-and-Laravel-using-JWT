import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoute } from './routes';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './services/login.interceptor';
import { SpinnerComponent } from './cors/spinner/spinner.component';
import { SpinnerInterceptor } from './services/spinner.interceptor';
import { EditTaskComponent } from './dashboard/edit-task/edit-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './cors/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DashboardComponent,
    SpinnerComponent,
    EditTaskComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
