import { Component, OnInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/data.service";
import {SpeechRecognition,SpeechRecognitionTranscription,SpeechRecognitionOptions } from 'nativescript-speech-recognition'
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html",
})

export class DetailComponent implements OnInit {
    public picture: any;
    options : SpeechRecognitionOptions;
    word: any;
    yourWord =  "ลองกดปุ่มพูดดูสิ";
    constructor(private speech_listen : SpeechRecognition ,private location: Location, private route: ActivatedRoute, private data: DataService, private router:Router) {
        this.picture = "~/app/practice/black.png";
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
        if (isAvailable()) {
          requestCameraPermissions()
            .then(
              fulfilled => {
                console.log('requestCameraPermissions fulfilled.');
              },
              rejected => {
                console.log('No camera permissions set.');
              }
            )
        }else {
          console.log('No camera detected of available.');
        }
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
    capture(): void {
      var options = { width: 300, height: 300, keepAspectRatio: true, saveToGallery: false };
  
      takePicture(options)
        .then(imageAsset => {
          this.picture = imageAsset;
        }).catch(function (err) {
          console.log("Error -> " + err.message);
        });
    }
}