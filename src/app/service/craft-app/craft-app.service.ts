import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/model/payment';
import { environment } from 'src/environments/environment';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root'
})
export class CraftAppService {

  private coreId: string = environment.coreId;
  private coreUrl: string = "";

  constructor(private http: HttpClient, private serverService: ServerService) {
    this.serverService.getStatusServer(this.coreId).subscribe(status => {
      if(status.publicDnsName)
        this.coreUrl = status.publicDnsName 
    });
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`http://${this.coreUrl}:8080/api/v1/payments`);
  }

  deletePayment(id: string){
    return this.http.delete(`http://${this.coreUrl}:8080/api/v1/payments/${id}`)
  }

  uploadPayment(file: File){
    console.log("enviando arquivo")
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`http://${this.coreUrl}:8080/api/v1/craft/start`, formData);
  }
}
