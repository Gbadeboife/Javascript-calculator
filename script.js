const equal=document.querySelector('[data-equal]');
const deleteButton=document.querySelector('[data-delete');
const clear=document.querySelector('[data-clear]');
const operations=document.querySelectorAll('[data-operation]');
const numbers=document.querySelectorAll('[data-number]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');
const keys=document.querySelectorAll('button');



class Calculator{
    constuctor(currentOperandTextElement){
        this.currentOperandTextElement=currentOperandTextElement;
        this.clearInput();

    };

    clearInput(){
    this.currentOperand = '';
    this.previousInput='';
    this.currentInput='';
    this.operation = undefined;
    };
    
    del(){
    this.currentOperand=this.currentOperand.toString().slice(0,-1);
    this.currentInput=this.currentInput.toString().slice(0,-1);
    };

    appendNumber(number){
    if(this.currentOperand===undefined){
        this.currentOperand=number;
    } else {
        if(this.currentInput.includes('.') && number==='.') {
            return;
        }   
        if(this.currentOperand.toString().length >= 11) return;
        this.currentOperand=''+this.currentOperand+number.toString();
    };

    if(this.previousInput===undefined){
        this.currentInput=this.currentOperand;
    } else {
        this.currentInput=`${this.currentInput}${number}`;
    }
    if(this.currentInput.includes('.') && number==='.') return;
    };

   
    
    chooseOperation(operation){
        var includes;
        this.operation=operation;
        var lastInput=this.currentOperand.toString().charAt(this.currentOperand.length-1);
        if(lastInput==='+'|| lastInput==='-' || lastInput==='*' || lastInput==='/'){
            return;
        };

        var prev=parseInt(this.previousInput);
        var cur=parseInt(this.currentInput);


    if(this.currentOperand.includes('+') || this.currentOperand.includes('-') || this.currentOperand.includes('*') || this.currentOperand.includes('/')){
        if(this.currentOperand.includes('+')){
            includes='+';
        }else if(this.currentOperand.includes('-')){
            includes='-';
        }else if(this.currentOperand.includes('*')){
            includes='*';
        }else if (this.currentOperand.includes('/')){
            includes='/';
        } else{
            console.log('bbbbb');
        };

        switch(includes){
            case '+':
                this.previousInput=prev+cur;
                break;
            case '-':
                this.previousInput=prev-cur;
                break;
            case '*':
                this.previousInput=prev*cur;   
                break;
            case '/':
                this.previousInput=prev/cur; 
        };
         
    } else {
        this.previousInput=this.currentInput;
    }
    
    this.currentInput='';
    if(this.currentOperand!==undefined){
            this.currentOperand=`${this.currentOperand}${operation}`;
    };  
    };
      

    compute(){
    let computation;
    const prev =  parseFloat(this.previousInput);
    const cur = parseFloat(this.currentInput);
    switch(this.operation){
        case '+':
            computation=prev+cur;
            break;
        case '-':
            computation=prev-cur;
            break;
        case '*':
            computation=prev*cur;
            break;
        case '/':
            computation=prev/cur;
            break;
        default:return;
    }  
    
    this.currentOperand=computation.toString();
    this.currentInput=this.currentOperand;
    this.operation= undefined;
    };
   
    updateDisplay(){
        if(this.currentOperand!==undefined){
        currentOperandTextElement.innerText=this.currentOperand;
        }
    };

};



const calculator=new Calculator(currentOperandTextElement);


numbers.forEach(
    button=>{
        button.addEventListener('click',()=>{
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();

        });
    }
);

keys.forEach(button=>{
    button.addEventListener('mouseover',()=>{button.style.backgroundColor='rgb(197,194,194)'});
    button.addEventListener('mouseout',()=>button.style.backgroundColor='white');
});



operations.forEach(button=>{
        button.addEventListener('click',()=>{
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        })
    }
);

equal.addEventListener('click',button =>{
    calculator.compute();
    calculator.updateDisplay();
}
);

clear.addEventListener('click',button =>{
        calculator.clearInput();
        calculator.updateDisplay();
    }
);



deleteButton.addEventListener('click',button=>{
    calculator.del();
    calculator.updateDisplay();
});
