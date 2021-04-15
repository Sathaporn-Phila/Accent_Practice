import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import {SpeechRecognition } from 'nativescript-speech-recognition'
import {TNSTextToSpeech, SpeakOptions} from 'nativescript-texttospeech'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Homepagecomponent } from './homepage/homepage.component'
import { Practicecomponent } from './practice/practice.component'
import { DetailComponent } from './practice/detail.component'
import { Challengescomponent } from './challenges/challenges.component'
import { AddWordComponent } from './addWord/addWord.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent , Homepagecomponent , Practicecomponent , DetailComponent , Challengescomponent, AddWordComponent],
  providers: [SpeechRecognition,TNSTextToSpeech],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
