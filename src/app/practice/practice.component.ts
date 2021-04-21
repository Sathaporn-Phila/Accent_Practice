import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { DataService } from '../services/data.service'

@Component({
    selector: 'ns-practice',
    templateUrl: './practice.component.html',
    styleUrls: ["./practice.component.css"]
  })
export class Practicecomponent implements OnInit {
    
    
    constructor(private DataService: DataService , private router: Router, private location: Location) {
        
    }
    words : Array<any>
    ngOnInit(): void {
        this.words = this.DataService.getAllWord()
        console.log(this.words)
    }
    
    goDetail(word : string){
        this.router.navigate(["/practice", word]);
    }
    back() {
        this.location.back();
    }
}