import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";

import { DataService } from '../services/data.service'
import {SpeechRecognition,SpeechRecognitionTranscription,SpeechRecognitionOptions } from 'nativescript-speech-recognition'
import { Location } from "@angular/common";
@Component({
    selector: 'ns-challenges',
    templateUrl: './challenges.component.html',
    styleUrls: ["./challenges.component.css"]
  })
  export class Challengescomponent implements OnInit {
    words : Array<any>
    indexList = [];
    word : string;
    defi: string;
    index: number;
    isShow = false ;
    options : SpeechRecognitionOptions;
    yourWord : string;
    temp :  Array<any>
    yourScore = 0;
    constructor(private location: Location,private speech_listen : SpeechRecognition , private DataService: DataService,private router:Router) {
        this.options = {
            locale : 'en-US',
            onResult: (transcription: SpeechRecognitionTranscription) =>{
                //   console.log(`${transcription.text}`);
                console.log(`${transcription.finished}`);
                this.yourWord = transcription.text;
                // console.log(typeof(this.yourWord));
            }
        }
        this.temp = this.DataService.getAllWord();
    }
    
    ngOnInit(): void {
        this.words = this.DataService.getAllWord()
        this.randomWord()
        this.startTimer()
    }
    timeLeft: number = 30;
    interval;

    startTimer() {
        clearInterval(this.interval)
        this.interval = setInterval(() => {
          console.log(this.timeLeft)
        if(this.timeLeft > 0) {
            this.timeLeft--;
            if (this.yourWord != undefined){
              if ( this.yourWord.toLowerCase() === this.word.toLowerCase() ){
                  this.isShow = true;
              }
            }
        } else {
            alert("Timeout ><")
            this.back()
        }
        },1000)
    }

    back() {
      clearInterval(this.interval)
      this.location.back();
    }    
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    
    randomWord(){
      for(let i = 0 ;i<this.words.length;i++){
        this.indexList.push(i);       
      }

      this.index = this.getRandomInt(this.indexList.length);
      this.word = this.words[this.indexList[this.index]].word;
      this.defi = this.words[this.indexList[this.index]].defi;
      this.indexList.splice(this.index, 1);
      if (this.indexList.length === 0 ){
        for(let i;i<this.words.length;i++){
          this.indexList.push(i);       
        }
      }   
    }

    nextButton(){
      this.randomWord()
      this.isShow=!this.isShow
      clearInterval(this.interval)
      this.yourWord = ""
      this.timeLeft = 30;
      this.startTimer()
      
    }

    triggerListening(){
        this.speech_listen.available().then(result =>{
          result ? this.startListening() : alert('SpeechRecognition is not ทำงาน');
        }, error => {
          console.error(error);
        }) 
    }

    startListening(){
        this.speech_listen.startListening(this.options).then(() => {
          console.log("Started")
          
        },error => {
          console.error(error);
          
        })
        
    }

    stopListening(){
        this.speech_listen.stopListening().then(() => {
          console.log("stop")
        },error => {
          console.error(error);
        })
        
    }

    test_tts(){
        this.DataService.sound(this.word);
    }

    
  }