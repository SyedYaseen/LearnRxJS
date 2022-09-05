import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RxjsLearnComponent} from "./rxjs-learn/rxjs-learn.component";

const routes: Routes = [
  {path: 'rxjs', component: RxjsLearnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
