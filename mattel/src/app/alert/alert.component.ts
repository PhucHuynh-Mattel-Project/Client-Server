import { Component, OnInit,OnDestroy,Input } from '@angular/core';
import{Router, NavigationStart} from '@angular/router';
import{Subscription} from 'rxjs';

import{Alert, AlertType} from '../models/alert';
import{AlertService} from '../services/AlertService/alert.service';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
@Component({selector:'alert', templateUrl: 'alert.component.html'})
export class AlertComponent implements OnInit {
  //Decorators
  @Input() id = 'default-alert';
  @Input() fade = true;

  //Array of alerts to store
  alerts:Alert[] =[];

  alertSubscription:Subscription;
  routeSubscription:Subscription;



  constructor(private router: Router, private alertService: AlertService) {
   }
//subscribes to observable returned from the alertService. 
//Method with will call router.events.subscribe to subscribe to route changes
// to clear alerts on route changes
  ngOnInit(): void {
    //Here is where we subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert =>{//will stream data to alert service
        //if there is an empty alert clear it
        if(!alert.message){
          //filters out alerts wihtout the keepAfterRouteChange flag 
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
        
          //this will remove the keepAfterRouteChange on rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        //add to alert array
        this.alerts.push(alert);

        //This will close the alert after a while
        if(alert.autoClose){
          setTimeout(()=> this.removeAlert(alert),3000);
        }

      });
      
  }
  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
        // fade out alert
      alert.fade = true;

        // remove alert after faded out
      setTimeout(() => {
          this.alerts = this.alerts.filter(x => x !== alert);
    }, 250);
    }else {
        // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }
//CSS in  ts that uses the enum 
cssClass(alert: Alert) {
  if (!alert) return;

  const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
            
  const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
  }

  classes.push(alertTypeClass[alert.type]);

  if (alert.fade) {
      classes.push('fade');
  }

    return classes.join(' ');
}

}
