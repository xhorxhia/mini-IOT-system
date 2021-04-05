import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { WebSocketAPI } from './websocket/WebSocketAPI';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    NotificationsComponent

  ],
  providers: [WebSocketAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
