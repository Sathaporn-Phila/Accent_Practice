import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Dialogs } from "@nativescript/core";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import { knownFolders,ImageSource} from '@nativescript/core';
import { DataService } from "../services/data.service";

@Component({
    selector: "editWord",
    templateUrl: "./editWord.component.html",
    styleUrls: ["./editWord.component.css"]
})

export class EditWordComponent implements OnInit {
    word: any;
    public picture: any;
    constructor(private DataService: DataService, private route: ActivatedRoute, private location: Location, private router:Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.word = this.DataService.getWord(params["word"]);
        });

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

        if (this.word.wordImage != null){
          this.picture = this.word.wordImage;
        }else{
          this.picture = "~/app/practice/black.png";;
        }
    }
    
    edit(nWord:string, definition:string){
        this.DataService.edit(this.word.word, nWord, definition)
        this.router.navigate(["/practice",this.word.word])
    }
    back(){
        this.location.back();
    }
    
    deleteWord(){
        Dialogs.confirm({
          title: "Confirm Deleting",
          message: "Confirm to delete word",
          cancelButtonText: "Cancel",
          okButtonText: "Comfirm"
        }).then(r =>{
          console.log(r);
          if(r){
            this.DataService.delete(this.word.word)
            this.router.navigate(["/practice"])
          }
        });   
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
            that.DataService.addImage(that.word.word,path.path);
          })

          
        }).catch(function (err) {
          console.log("Error -> " + err.message);
        });
    }

}
