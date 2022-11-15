import { Component, OnInit } from '@angular/core';
import { StatusServer } from 'src/app/model/status-server';
import { ServerService } from 'src/app/service/server/server.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerChangeService } from 'src/app/service/server-change.service';
import { LoadingChangeService } from 'src/app/service/loading-change.service';

@Component({
  selector: 'app-status-server',
  templateUrl: './status-server.component.html',
  styleUrls: ['./status-server.component.css']
})
export class StatusServerComponent implements OnInit {

  statusServers: StatusServer[] = [];
  loading: boolean = true;
  private instanceIds: string[] = environment.intanceIds;

  constructor(private serverService: ServerService, private serverChangeService: ServerChangeService, private loadingChangeService: LoadingChangeService) { }

  ngOnInit() {
    this.refresh();
  }

  startServer(id: string) {
    this.initProcess();
    this.serverService.startServer(id).subscribe(() => this.getStatusServers());
  }

  startAllServers(){
    this.initProcess();
    let tasksObservable = this.instanceIds.map(id => this.serverService.startServer(id));
    forkJoin(tasksObservable).subscribe(() => this.getStatusServers())
  }

  stopAllServers(){
    this.initProcess();
    let tasksObservable = this.instanceIds.map(id => this.serverService.stopServer(id));
    forkJoin(tasksObservable).subscribe(() => this.getStatusServers())
  }

  stopServer(id: string) {
    this.initProcess();
    this.serverService.stopServer(id).subscribe(() => this.getStatusServers());
  }

  getStatusServers() {
    let tasksObservable = this.instanceIds.map(id => this.serverService.getStatusServer(id));

    forkJoin(tasksObservable).subscribe(tasksResults => {
      tasksResults.forEach(result => this.statusServers.push(result));
      this.announceSetup(this.setup());
      this.stopLoading();
    })
  }

  refresh(){
    this.initProcess();
    this.getStatusServers();
  }

  initProcess(){
    this.startLoading();
    this.cleanStatus();
  }

  cleanStatus(){
    this.statusServers = [];
  }

  // Loading
  startLoading(){
    this.loading = true;
    this.loadingChangeService.change(true);
  }

  stopLoading(){
    this.loading = false;
    this.loadingChangeService.change(false);
  }
  //

  // Observable
  setup(): boolean {
    return this.statusServers.every(status => status.state.code === 16);
  }

  announceSetup(ready: boolean) {
    this.serverChangeService.change(ready);
  }
  //

}
