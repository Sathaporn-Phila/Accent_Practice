import { Component, OnInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import { knownFolders,ImageSource} from '@nativescript/core';
import { DataService } from "../services/data.service";
import { Dialogs } from "@nativescript/core";

@Component({
    selector: "addWord",
    templateUrl: "./addWord.component.html",
    styleUrls: ["./addWord.component.css"]
})

export class AddWordComponent implements OnInit {
    public picture: any;
    constructor(private DataService: DataService, private location: Location) {
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
    }
    
    add(word: string, definition: string){
        if(word != "" && definition != ""){
            this.DataService.add(word, definition)
            this.DataService.addImage(word, this.picture)
            this.location.back();
        }else{
          Dialogs.alert({
            title: "Add word failed",
            message: "Don't fill textfeild with empty value",
            okButtonText: "OK"
          })
        }
    }

    back(){
        this.location.back();
    }
    capture(word: string): void {
        var options = { width: 300, height: 300, keepAspectRatio: true, saveToGallery: false };
    
        takePicture(options)
          .then(imageAsset => {
            var that = this // ทำไมใช้ this บ่ได้
            
            ImageSource.fromAsset(imageAsset).then(function(imageSource){
              var folder = knownFolders.documents();
              var path = folder.getFolder("wordImage").getFile(word + String((new Date()).getTime()) + ".jpg");
              console.log(path.path)
              imageSource.saveToFile(path.path, "jpg");
  
              that.picture = path.path;
            })
  
            
          }).catch(function (err) {
            console.log("Error -> " + err.message);
          });
    }
}