import { Component, OnInit, NgZone } from "@angular/core";

import { DataService } from "../services/data.service";

@Component({
    selector: "addWord",
    templateUrl: "./addWord.component.html",
})

export class AddWordComponent implements OnInit {
    constructor(private DataService: DataService) {
    }

    ngOnInit() {        
    }
    
    add(word: string, definition: string){
        if(word != "" && definition != ""){
            this.DataService.add(word, definition)
        }
    }
}