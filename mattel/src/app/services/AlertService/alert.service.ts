import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';//Used to communicate with other components

import {filter} from 'rxjs/operators';

import{Alert, AlertType} from '../../models/alert';

//This class will act as a bridge between any component 
//this will cause the alert component to display messages. 
//Below you will see methods for displaying, destorying, 
//and subscribing to alert messages


@Injectable({providedIn: 'root'})
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    //used to subscribe to alerts observable
    onAlert(id  = this.defaultId): Observable<Alert>{
      return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    alert(alert: Alert) {
      alert.id = alert.id || this.defaultId;
      this.subject.next(alert);
    }
    clear(id = this.defaultId) {
      this.subject.next(new Alert({ id }));
    }

    //Uses Alert Model classes enum and passes the message
    success(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

  constructor() { }
}
