import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
}
)
export class ServerChangeService {

  private statusServerChangeSource = new Subject<boolean>();
  private urlServerSource = new Subject<string>();

  statusServerChange$ = this.statusServerChangeSource.asObservable();
  urlServer = this.urlServerSource.asObservable();
  
  change(ready: boolean) {
    this.statusServerChangeSource.next(ready);
  }

  url(url: string){
    this.urlServerSource.next(url);
  }

}