import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { Homepagecomponent } from './homepage/homepage.component'
import { Practicecomponent } from './practice/practice.component'
import { DetailComponent } from './practice/detail.component'
const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: Homepagecomponent },
  { path: 'practice', component: Practicecomponent },
  { path: 'practice/:word', component: DetailComponent}
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {
}
