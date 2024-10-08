import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User, Address } from 'src/app/models/model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User = {} as User;

  constructor() {

  }

  ngOnInit(): void {
    // console.log(this.user)
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  //   console.log('Input property changed:', changes['user']);
  // }


  delete() {
    // this.youtubeRepo.deleteUser(this.user.id);
    // console.log(this.user)
  }

  update() {
    // this.dialog.open(UpdateUserComponent, {
    //   width: '256px', data: this.user
    // });
  }

  open() {
    // this.router.navigate(['user', this.user.id]);
  }

}
