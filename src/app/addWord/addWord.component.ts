import { Component, OnInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";

import { DataService } from "../services/data.service";

@Component({
    selector: "addWord",
    templateUrl: "./addWord.component.html",
})

export class AddWordComponent implements OnInit {
    constructor(private DataService: DataService, private location: Location) {
    }

    ngOnInit() {        
    }
    
    add(word: string, definition: string){
        if(word != "" && definition != ""){
            this.DataService.add(word, definition)
            this.location.back();
        }
    }
}