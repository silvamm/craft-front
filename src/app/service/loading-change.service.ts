import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
}
)
export class LoadingChangeService {

  private loadingChangeSource = new Subject<boolean>();

  loadingChange$ = this.loadingChangeSource.asObservable();
  
  change(ready: boolean) {
    this.loadingChangeSource.next(ready);
  }
  
}