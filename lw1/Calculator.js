var calculator = new function()
{
    this.read = {
        firstNum: Number(prompt('Введите первое число', '')),
        secondNum: Number(prompt('Введите второе число', ''))
    }
    this.sum = this.read.firstNum + this.read.secondNum;
    this.mul = this.read.firstNum * this.read.secondNum;
}

calculator.read;
alert( "Сумма = " + calculator.sum );
alert( "Произведение = " + calculator.mul );