import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  debounceTime, elementAt, filter,
  first,
  from,
  fromEvent,
  interval,
  last, map,
  Observable,
  of, Subscription,
  switchMap,
  take,
  takeLast,
  takeWhile
} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rxjs-learn',
  templateUrl: './rxjs-learn.component.html',
  styleUrls: ['./rxjs-learn.component.scss']
})
export class RxjsLearnComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder) { }
  interval$: Observable<any> = interval(1000);
  intervalSubscription: Subscription;
  searchForm: FormGroup;
  // @ViewChild('myBtn') myBtn: ElementRef;
  keyUp(){}

  ngAfterViewInit() {
   const myBtnMouseOver$: Observable<Event> = fromEvent(this.myBtn.nativeElement, 'mouseover');
    myBtnMouseOver$
        .pipe(map((event: Event) => {
          return {
            x: (event as PointerEvent).clientX,
            y: (event as PointerEvent).clientY,
          }
        }))
        .subscribe(value => console.log(value))
  }

  subs() {
    this.intervalSubscription = this.interval$
        .pipe(map(val => val * 10))
        .subscribe(value => {
      console.log(value)
    })
  }



  unsubs() {
    this.intervalSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: new FormControl('search'),
      another: new FormControl('another')
    })

    this.searchForm.get('search')?.valueChanges
        .pipe(
            filter(val => val.length > 5),
            debounceTime(2000),
        )
        .subscribe(data => {
          console.log(data)
          // interval(1000).subscribe(val => console.log(data  ))
        } )

    this.searchForm?.valueChanges
        .pipe(
            elementAt(6)
        )
        .subscribe(value => {

        })

    this.agent$.subscribe({
      next: value => this.agentName = value
    })

    this.ObsUsingOf$.subscribe({
      next: value =>  {
        const Seq$ = interval(1000);

        // Seq$.subscribe({
        //   next: num => {
        //     if(num < 5) console.log(value + " " + num)
        //   }
        // })
      }
    })

    this.ObsUsingFrom$.subscribe({
      next: value =>  {
        setTimeout(()=> {
          this.observableWithFrom = this.observableWithFrom + value;
        }, 2000)
      }
    })
    this.ObsUsingFrom$
        .pipe(takeWhile(
            value => value.length >= 3))
        .subscribe(val => {
          console.log("take", val)
        })

    // this.ClickEvent$.subscribe({
    //   next: value => console.log(value?.target)
    // })
  }

  agentName: string = '';
  observableWithFrom: string = 'Obs with From';
  //Creating Observable with a timeout
  agent$: Observable<any> = new Observable((subscriber) => {
    try {
      subscriber.next({name: 'Pappu'});

      setTimeout(()=> {
        subscriber.next({word: 'Loves'});
      }, 3000)

      setTimeout(()=> {
        subscriber.next({ob: 'Kathrika'});
      }, 6000)

    } catch (e) {
      subscriber.error(e);
    }
  })

  //Creating Observable with Of operator
    //Takes any kind of obj - string, array, obj
    // Returns them as a whole
  ObsUsingOf$: Observable<string[]> = of(['This', 'That', 'What', 'Put']);

  //Creating Observable with from operator
    //Gets an array or iterable only and send them one by one instead of sending the whole array
  ObsUsingFrom$: Observable<string> = from(['Hey', 'What', 'Is', 'Put']);

  //Create Observable from event
  DocumentClickEvent$ = fromEvent(document, 'click');
  @ViewChild('myBtn') myBtn: ElementRef;
  obsEvent$: Observable<any>;


  ObsFromEvent() {
    this.obsEvent$ = fromEvent(this.myBtn?.nativeElement, 'click');
    this.obsEvent$.subscribe({
      next: value => console.log(value)
    })
  }

}
