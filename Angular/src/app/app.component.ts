import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './leela/redux1/app.state';
import { getLoaded } from './redux/reducers/user-reducer';
import { getErrorMessage, getLoading } from './leela/redux1/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'redux';

  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;

  error = 'flomdskfmewdsm'

  constructor(private store: Store<AppState>) {

    console.log('app component')

  }

  ngOnInit() {

    this.showLoading = this.store.select(getLoading)
    this.errorMessage = this.store.select(getErrorMessage)

  }
  

}
