import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Dialogs } from "@nativescript/core";

import { DataService } from "../services/data.service";

@Component({
    selector: "editWord",
    templateUrl: "./editWord.component.html",
    styleUrls: ["./editWord.component.css"]
})

export class EditWordComponent implements OnInit {
    word: any;
    constructor(private DataService: DataService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.word = this.DataService.getWord(params["word"]);
        });
    }
    
    edit(nWord:string, definition:string){
        this.DataService.edit(this.word.word, nWord, definition)
        this.location.back();
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
            this.back()
          }
        });   
      }
}
