import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatInputModule, MatPaginatorModule, 
  MatSortModule, MatTableModule } from "@angular/material";
import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  
  MatProgressSpinnerModule } from '@angular/material';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    DateTimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ }),
    SweetAlert2Module.forRoot(),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
