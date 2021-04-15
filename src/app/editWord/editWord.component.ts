import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { DataService } from "../services/data.service";

@Component({
    selector: "editWord",
    templateUrl: "./editWord.component.html",
})

export class EditWordComponent implements OnInit {
    word: any;
    constructor(private DataService: DataService, private route: ActivatedRoute, private location: Location) {
        this.word = {}
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.word = this.DataService.getWord(params["word"]);
        });
        console.log(this.word.word)     
    }
    
    edit(nWord:string, definition:string){
        this.DataService.edit(this.word.word, nWord, definition)
        this.location.back();
    }
}