import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Payment } from 'src/app/model/payment';
import { CraftAppService } from 'src/app/service/craft-app/craft-app.service';
import { LoadingChangeService } from 'src/app/service/loading-change.service';
import { ServerChangeService } from 'src/app/service/server-change.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  serverReady: boolean = false;
  loading: boolean = true;
  subscription: Subscription;
  payments: Payment[] = [];
  selectedFiles?: FileList;
  
  constructor(private craftAppService: CraftAppService, private serverStatusService: ServerChangeService, private loadingChangeService: LoadingChangeService) {
    this.subscription = serverStatusService.statusServerChange$.subscribe(ready => {
      this.serverReady = ready 
      if(this.serverReady)
        this.getPayments()
    })
    this.subscription = loadingChangeService.loadingChange$.subscribe(loading => this.loading = loading)
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  getPayments(){
    this.craftAppService.getPayments().subscribe(payments => this.payments = payments)
  }

  delete(id: string){
    
      this.craftAppService.deletePayment(id).subscribe(() => this.getPayments());
  }
       
  upload(){
    this.loadingChangeService.change(true)
    if (!this.selectedFiles) 
      return

    const file: File | null = this.selectedFiles.item(0);

    if (!file) 
      return
    
    this.craftAppService.uploadPayment(file).subscribe(() => {
      this.getPayments()
      this.loadingChangeService.change(false)
    });
      
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
