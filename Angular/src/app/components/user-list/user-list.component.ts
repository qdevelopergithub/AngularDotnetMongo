import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[] = [] as User[];

  constructor() {

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  //   console.log('Input property changed:', changes['users']);
  // }

  ngOnInit(): void {
  }

}
