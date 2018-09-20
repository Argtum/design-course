const Calculator = function()
{
    this.firstNum = 0;
    this.secondNum = 0;

    this.read = function() {
        this.firstNum = parseInt(prompt('Введите первое число', 0), 10) || 0;
        this.secondNum = parseInt(prompt('Введите второе число', 0), 10) || 0;
    };

    this.sum = function() {
        return this.firstNum + this.secondNum;
    };

    this.mul = function() {
        return this.firstNum * this.secondNum;
    };
}

function main() {
    const calculation = new Calculator();
    calculation.read();
    console.log("Сумма = ", calculation.sum());
    console.log("Произведение = ", calculation.mul());
}

main();