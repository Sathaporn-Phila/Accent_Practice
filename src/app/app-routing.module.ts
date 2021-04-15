import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { Homepagecomponent } from './homepage/homepage.component'
import { Practicecomponent } from './practice/practice.component'
import { DetailComponent } from './practice/detail.component'
import { Challengescomponent } from './challenges/challenges.component'
import  { AddWordComponent } from './addWord/addWord.component'
import { EditWordComponent} from './editWord/editWord.component'
const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: Homepagecomponent },
  { path: 'addWord', component: AddWordComponent },
  { path: 'challenges', component: Challengescomponent },
  { path: 'edit/:word', component: EditWordComponent },
  { path: 'practice', component: Practicecomponent },
  { path: 'practice/:word', component: DetailComponent}
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {
}
