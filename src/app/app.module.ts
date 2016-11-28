import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { SchedulePage, AddScheduleItem } from '../pages/schedule/schedule';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    SchedulePage,
    AddScheduleItem
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    SchedulePage,
    AddScheduleItem
  ],
  providers: []
})
export class AppModule {}
