import { NgModule } from '@angular/core';
import { IonicApp, IonicModule} from 'ionic-angular';
import { AUTOCOMPLETE_DIRECTIVES, AUTOCOMPLETE_PIPES } from 'ionic2-auto-complete';
import { MyApp } from './app.component';
import { Page1, AddFriendModal, AddToDoModal } from '../pages/page1/page1';
import { SchedulePage, AddScheduleItem } from '../pages/page2/page2';
import {FriendAutoCompleteService} from '../providers/autocomplete';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    AddFriendModal,
    AddToDoModal,
    SchedulePage,
    AddScheduleItem,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    AddFriendModal,
    AddToDoModal,
    SchedulePage,
    AddScheduleItem
  ],
  providers: [
    FriendAutoCompleteService
  ]
})
export class AppModule {}
