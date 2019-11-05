import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  public getNumber(v: string) {
    console.log(v);
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? (this.currentNumber = v) : (this.currentNumber += v);
    }
  }
  public getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }
  public doCalculation(op, secondOperand) {
    switch (op) {
      case '+':
        return (this.firstOperand += secondOperand);
      case '-':
        return (this.firstOperand -= secondOperand);
      case '*':
        return (this.firstOperand *= secondOperand);
      case '/':
        return (this.firstOperand /= secondOperand);
      case '=':
        return secondOperand;
    }
  }
  public getOperation(o: string) {
    console.log(o);
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = result;
      this.firstOperand = result;
    }
    this.operator = o;
    this.waitForSecondNumber = true;
    console.log(this.firstOperand);
  }
  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
  ngOnInit() {}
}
