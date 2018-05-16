import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  users: Array<any>;

  constructor(private dataService: DataService) { 

    this.dataService.getUsers()
      .subscribe(res => this.users = res);
  }

  ngOnInit() {
  }

}
