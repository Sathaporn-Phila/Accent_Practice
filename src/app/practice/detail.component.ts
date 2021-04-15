import { Component, OnInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
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
    constructor(private speech_listen : SpeechRecognition ,private location: Location, private route: ActivatedRoute, private data: DataService, private router:Router) {
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
        this.speech_listen.available().then(
          (available: boolean) => console.log(available ? "YES!" : "NO"),
          (err: string) => console.log(err)
        );
        this.speech_listen.requestPermission().then((granted: boolean) => {
          console.log("Granted? " + granted);
        });
        
    }

    back() {
        this.location.back();
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
          console.log(this.yourWord);
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
      this.data.sound(this.word.word);
    }
    goEdit(){
      this.router.navigate(["/edit",this.word.word])

    }
    deleteWord(){
      this.data.delete(this.word.word)
      this.back()
    }
}