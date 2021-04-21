import { Component, OnInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/data.service";
import {SpeechRecognition,SpeechRecognitionTranscription,SpeechRecognitionOptions } from 'nativescript-speech-recognition'
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import { knownFolders,ImageSource} from '@nativescript/core';
import * as application from "@nativescript/core/application";

@Component({
    selector: "detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.css"]
})

export class DetailComponent implements OnInit {
    public picture: any;
    options : SpeechRecognitionOptions;
    word: any;
    yourWord =  "ลองกดปุ่มพูดดูสิ";
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

        if (application.android){
          application.android.on(application.AndroidApplication.activityBackPressedEvent,() =>{
            clearInterval(this.interval)
            console.log("BACK")
          })
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
          
          if (this.word.wordImage != null){
            this.picture = this.word.wordImage;
          }else{
            this.picture = "~/app/practice/black.png";;
          }
      });
        this.speech_listen.available().then(
          (available: boolean) => console.log(available ? "YES!" : "NO"),
          (err: string) => console.log(err)
        );
        this.speech_listen.requestPermission().then((granted: boolean) => {
          console.log("Granted? " + granted);
        });
        this.startTimer();
    }
    timeLeft = 60;
    interval;
    startTimer() {
      clearInterval(this.interval)
      this.interval = setInterval(() => { },1000)
  }
    back() {
      clearInterval(this.interval)
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
      console.log(this.word.word);
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
          var that = this // ทำไมใช้ this บ่ได้
          
          ImageSource.fromAsset(imageAsset).then(function(imageSource){
            var folder = knownFolders.documents();
            var path = folder.getFolder("wordImage").getFile(that.word.word + String((new Date()).getTime()) + ".jpg");
            console.log(path.path)
            imageSource.saveToFile(path.path, "jpg");

            that.picture = path.path;
            that.data.addImage(that.word.word,path.path);
          })

          
        }).catch(function (err) {
          console.log("Error -> " + err.message);
        });
    }
}