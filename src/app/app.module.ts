import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import {SpeechRecognition } from 'nativescript-speech-recognition'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Homepagecomponent } from './homepage/homepage.component'
import { Practicecomponent } from './practice/practice.component'
import { DetailComponent } from './practice/detail.component'
@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent, Homepagecomponent,Practicecomponent,DetailComponent],
  providers: [SpeechRecognition],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
