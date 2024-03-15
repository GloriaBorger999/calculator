class calculator{
    constructor(previousOperand, currentOperand){
        this.previousoperand = previousOperand
        this.currentoperand = currentOperand
        this.clear()
    }
    clear(){
        this.currentoperandtext = " "
        this.previousoperandtext = " "
        this.operation = undefined
    }
    delete(){
        if (this.previousoperandtext != " " && this.currentoperandtext == " "){ 
            this.currentoperandtext = this.previousoperandtext
            this.previousoperandtext = " "
        }
        let x = this.currentoperandtext
        this.currentoperandtext = (x.toString()).slice(0, x.length - 1)
    }
    appendNumber(number){
        if (this.currentoperandtext.includes(".") && number == "."){ return }
        this.currentoperandtext = this.currentoperandtext.toString() + number.toString()
    }
    chooseOperation(operation){
        let x = this.previousoperandtext.split('')
        let y = []
        let p = ""
        operationButtons.forEach( x => {y.push(x.innerText)})
        console.log(y)
        if (this.currentoperandtext === " "){ return }
        if (this.previousoperandtext != " "){ this.compute() }   
        this.previousoperandtext = this.currentoperandtext.toString() + operation.toString()
        this.currentoperandtext = " "
    }
    compute(){
        let q = ""
        let u = ""
        let x = this.previousoperandtext.split('')
        if (x[x.length - 1] == "%") { 
            x[x.length - 1] = "/"
            console.log(eval(x.join('') + this.currentoperandtext.toString()))
            q = eval(x.join('') + this.currentoperandtext.toString() + "*100")
            this.previousoperandtext = this.previousoperandtext.toString() + this.currentoperandtext.toString()
            this.currentoperandtext = q
            return
        }
        q = eval(this.previousoperandtext.toString() + this.currentoperandtext.toString()).toString()
        this.previousoperandtext = " "
        this.currentoperandtext = q
    }
    updateDisplay(){
        this.currentoperand.innerText = this.currentoperandtext
        this.previousoperand.innerText = this.previousoperandtext
    }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allclearButton = document.querySelector("[data-all-clear]")
const previousOperand = document.querySelector("[data-previous]")
const currentOperand = document.querySelector("[data-current]")

const calc = new calculator(previousOperand, currentOperand)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

allclearButton.addEventListener('click', () => {
        calc.clear()
        calc.updateDisplay()
    })

deleteButton.addEventListener('click', () => {
        calc.delete()
        calc.updateDisplay()
    })

equalsButton.addEventListener('click', () => {
        calc.compute()
        calc.updateDisplay()
    })