import { Client } from './../client';
import { Observable } from 'rxjs';
import { ClientService } from '../client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients$: Observable<any>;
  clientsVisualization: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clients$ = this.clientService.getClients();
  }

}
