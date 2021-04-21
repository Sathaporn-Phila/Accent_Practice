import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: 'credit',
    templateUrl: './credit.component.html',    
    styleUrls: ["./credit.component.css"]
  })
  export class CreditComponent implements OnInit {
      
    constructor(private location: Location) {}
  
    ngOnInit(): void {
    }
    back(){
      this.location.back();
    }
  }
