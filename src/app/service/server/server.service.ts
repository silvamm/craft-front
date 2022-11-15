import { Injectable } from '@angular/core';
import { StatusServer } from '../../model/status-server';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private lambdaStatusServerUrl = environment.lambdaStatusServerUrl

  constructor(private http: HttpClient) { }

  getStatusServer(id: string): Observable<StatusServer> {
    return this.http.get<StatusServer>(this.lambdaStatusServerUrl + `/${id}`);
  }

  startServer(id: string): Observable<any> {
    var instance_id = { instance_id: id };
    return this.http.post(this.lambdaStatusServerUrl + "/start", instance_id);
  }

  stopServer(id: string): Observable<any> {
    var instance_id = { instance_id: id };
    return this.http.post(this.lambdaStatusServerUrl + "/stop", instance_id);

  }
}
