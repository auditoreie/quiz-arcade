import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  //private oneSignal: OneSignal


  constructor(
    // private app: App,
    private platform: Platform,
    // private menu: MenuController,
    private oneSignal: OneSignal, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen)
    {
      // platform.ready().then(() => {      
      //     statusBar.hide();
      //     splashScreen.hide();
      // });
      this.initializeApp();
    }
    initializeApp(){
      this.platform.ready().then(() => {      
            this.statusBar.hide();
            this.splashScreen.hide();
            
            if (isCordovaAvailable()){
              this.oneSignal.startInit(oneSignalAppId, sender_id);
              this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
              this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
              this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
              this.oneSignal.endInit();
            }
        });
    }
    private onPushReceived(payload: OSNotificationPayload) {
      alert(payload.body);
    }
    
    private onPushOpened(payload: OSNotificationPayload) {
      alert(payload.body);
    }
}