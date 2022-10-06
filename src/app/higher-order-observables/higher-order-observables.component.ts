import {AfterContentInit, Component, OnInit} from '@angular/core';
import {
    of,
    map,
    mergeMap,
    switchMap,
    concatMap,
    Observable,
    from,
    subscribeOn,
    exhaustMap,
    debounceTime,
    interval, filter, take, tap
} from 'rxjs'
import {ajax} from "rxjs/ajax";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-higher-order-observables',
  templateUrl: './higher-order-observables.component.html',
  styleUrls: ['./higher-order-observables.component.scss']
})
export class HigherOrderObservablesComponent implements OnInit, AfterContentInit {

  number$: Observable<number> = from([1,2,3,4]);

  constructor() { }

  ngOnInit(): void {
      // from([1,2,3,4])
      //     .pipe(
      //         mergeMap(id => {
      //             return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`)
      //                 .pipe(map(data => data.response))
      //         })
      //     )
      //     .subscribe(data => console.log(data))

      // from([1,2,3,4])
      //     .pipe(
      //         concatMap(id => {
      //             return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`)
      //                 .pipe(map(data => data.response))
      //         })
      //     )
      //     .subscribe(data => console.log(data))

     // interval(100)
     //      .pipe(
     //          filter(id => id > 0),
     //          tap(id => console.log(id)),
     //          take(10),
     //          exhaustMap(id => {
     //              return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`)
     //                  .pipe(map(data => data.response))
     //          }),
     //
     //      )
     //      .subscribe(data => console.log(data))

      interval(100)
          .pipe(
              filter(id => id > 0),
              tap(id => console.log(id)),
              take(10),
              switchMap(id => {
                  return ajax(`https://jsonplaceholder.typicode.com/posts/${id}`)
                      .pipe(map(data => data.response))
              }),
          )
          .subscribe({
              next: data => console.log(data)}
          )

  }

  ngAfterContentInit() {
    // this.number$
    //     .pipe(
    //         switchMap(value => of(value * 10))
    //     )
    //     .subscribe(
    //         data => {
    //           console.log(data)
    //         }
    //     )
  }
}
