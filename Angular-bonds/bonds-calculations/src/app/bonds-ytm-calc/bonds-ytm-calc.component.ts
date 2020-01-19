import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonds-ytm-calc',
  templateUrl: './bonds-ytm-calc.component.html',
  styleUrls: ['./bonds-ytm-calc.component.scss']
})
export class BondsYtmCalcComponent implements OnInit {
  disabledButton: boolean = true;
  couunter: number = 0;
  userText: string = '';
  magicString: string = "norbert";
  magicStringIsTyped: boolean = false;


  constructor() { 
    setTimeout(() => this.disabledButton = false, 3000)
  }

  ngOnInit() {
  }

  onAdd = () => {this.couunter++};

  onInputUpdate = (event) => {
    const {value } = event.target;
    this.userText = value
    this.magicStringIsTyped = (value === this.magicString) ? true : false;
    console.log(value, this.userText, this.magicStringIsTyped, this.magicString)
  }
}
