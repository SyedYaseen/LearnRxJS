import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  connectable,
  ConnectableObservable,
  from,
  fromEvent,
  interval,
  multicast,
  Observable,
  Observer,
  of, share,
  Subject, take, forkJoin
} from "rxjs";

@Component({
  selector: 'app-subjects-rxjs',
  templateUrl: './subjects-rxjs.component.html',
  styleUrls: ['./subjects-rxjs.component.scss']
})
export class SubjectsRxjsComponent implements OnInit {

  example = 'this'

  @ViewChild('inputRef') inputElement : ElementRef;

  assign(){
    console.log(this.inputElement.nativeElement.value)
    this.example = this.inputElement.nativeElement.value
  }

  logValue(){
    console.log(this.example)
  }

  constructor() { }

  ngOnInit(): void {
    // this.subjectsObservable()
    // this.HotColdObservable()
    // this.multiCastingObs()
    this.forkJoin()
  }

  forkJoin(){
    let obs1$ = of(1,2,3,4)
    let obs2$ = of('a', 'b', 'c')

    forkJoin({
    val1:obs1$,
    val2: obs2$}
    ).subscribe(value => console.log(value))
  }

  multiCastingObs(){
    let interval$ = connectable(interval(1000).pipe(take(10)))
    let interval2$ = interval(1000).pipe(
        share(),
        take(10)
    ) //Doesn't need connect method. Sends value if only one observable subscribes to it.

    //deprecated method
    // let interval$ = interval(1000).pipe(
    //     take(10),
    //     multicast(new Subject()),
    //    ) as ConnectableObservable<number>

    interval$.subscribe(value => console.log(value))
    setTimeout(()=> {
      interval$.subscribe(value => console.log(value))
    }, 3000)

    interval$.connect()


    interval2$.subscribe(value => console.log(value))
    setTimeout(()=> {
      interval2$.subscribe(value => console.log(value))
    }, 3000)
  }

  subjectsObservable(){
    let obs$ = of(1,2,3,4);
    let subj = new Subject<number>();


    let observer1: Observer<number> = {
      next: value => console.log('obs1' + value),
      error: value => console.log(value),
      complete: () => console.log("Complete")
    }

    let observer2: Observer<number> = {
      next: value => console.log('obs2' + value),
      error: value => console.log(value),
      complete: () => console.log("Complete")
    }

    subj.subscribe(observer1);
    subj.subscribe(observer2);

    obs$.subscribe(subj);

  }

  HotColdObservable(){
    let obs$ =  new Observable(subscriber => {
      subscriber.next(Math.random())
    })
    let sub$ = new Subject();

    sub$.subscribe(value => console.log('one' + ' ' + value))
    sub$.subscribe(value => console.log('two' + ' ' +value))

    obs$.subscribe(sub$)


    let eve$ = fromEvent(document, 'click')
    let sub2$ = new Subject()
    sub2$.subscribe(value => console.log((value as PointerEvent).clientX))
    sub2$.subscribe(value => console.log((value as PointerEvent).clientX))
    eve$.subscribe(sub2$)
  }
}
