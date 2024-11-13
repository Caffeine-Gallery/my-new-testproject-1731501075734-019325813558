import { backend } from 'declarations/backend';

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    try {
        const expression = display.value;
        const result = await evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
};

async function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    for (let op of operators) {
        if (expression.includes(op)) {
            const [left, right] = expression.split(op).map(parseFloat);
            switch (op) {
                case '+':
                    return await backend.add(left, right);
                case '-':
                    return await backend.subtract(left, right);
                case '*':
                    return await backend.multiply(left, right);
                case '/':
                    return await backend.divide(left, right);
            }
        }
    }
    return parseFloat(expression);
}
