var colors = require('colors');

let firstNumber = 2,
    secondNumber = 100,
    colorsArr = ['green', 'yellow', 'red'];

    simpleCounter(firstNumber, secondNumber);

function simpleCounter(startCount, endCount, cntr = 0, trigger = true) {
    let start = parseInt(startCount), 
        end = parseInt(endCount);

    if(start < 2) {
        start = 2;
    } 

    if(!Number.isInteger(start) || !Number.isInteger(end)) {
        console.log(colors.red('Один или оба аргумента не являются числами'));
        return;
    }

    if(start >= end) {
        console.log(colors.red('В указанном диапазоне нет простых чисел'));
        return;
    }

    nextPrime:
    for (let i = start; i <= end; i++) {
    
        for (let j = 2; j < i; j++) { 
        if (i % j == 0) continue nextPrime; 
        }
        
        console.log(colors[colorsArr[cntr]](i)); 
        cntr++;
        trigger = false;
        if(cntr > 2) {
            cntr = 0;
        }
    }

    if(trigger) {
        console.log(colors.red('В указанном диапазоне нет простых чисел'));
        return;
    }
}