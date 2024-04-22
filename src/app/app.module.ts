import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { FormsModule} from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TimeGreetingComponent } from './time-greeting/time-greeting.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TimeGreetingComponent,
    PopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
