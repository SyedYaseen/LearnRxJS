import {AfterContentInit, Component, OnInit} from '@angular/core';
import {of, map, mergeMap, switchMap, concatMap, Observable, from, subscribeOn} from 'rxjs'

@Component({
  selector: 'app-higher-order-observables',
  templateUrl: './higher-order-observables.component.html',
  styleUrls: ['./higher-order-observables.component.scss']
})
export class HigherOrderObservablesComponent implements OnInit, AfterContentInit {

  number$: Observable<number> = from([1,2,3,4]);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.number$
        .pipe(
            switchMap(value => of(value * 10))
        )
        .subscribe(
            data => {
              console.log(data)
            }
        )
  }


}
