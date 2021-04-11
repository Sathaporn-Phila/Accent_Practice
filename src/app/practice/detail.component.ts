import { Component, OnInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../services/data.service";
import {SpeechRecognition,SpeechRecognitionTranscription,SpeechRecognitionOptions } from 'nativescript-speech-recognition'

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html",
})
export class DetailComponent implements OnInit {
    options : SpeechRecognitionOptions;
    word: any;
    yourWord =  "reading";
    constructor(  private speech : SpeechRecognition ,private location: Location, private route: ActivatedRoute, private data: DataService) {
        this.word = {};
        this.options = {
            locale : 'en-US',
            onResult: (transcription: SpeechRecognitionTranscription) =>{
            //   console.log(`${transcription.text}`);
                console.log(`${transcription.finished}`);
                this.yourWord = transcription.text;
                console.log(typeof(this.yourWord));
                }
        }
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.word = this.data.getWord(params["word"]);
        });
    }

    back() {
        this.location.back();
    }

    triggerListening(){
        this.speech.available().then(result =>{
          result ? this.startListening() : alert('SpeechRecognition is not ทำงาน');
        }, error => {
          console.error(error);
        }) 
    }

    startListening(){
        this.speech.startListening(this.options).then(() => {
          console.log("Started")
          console.log(this.yourWord);
        },error => {
          console.error(error);
        })
    }

    stopListening(){
        this.speech.stopListening().then(() => {
          console.log("stop")
        },error => {
          console.error(error);
        })
    }
}