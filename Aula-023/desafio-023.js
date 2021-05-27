(function (win, doc) {
    'use strict';

    var $visor = document.querySelector('[data-js="visor"]');
    var $buttonNumbers = doc.querySelectorAll('[data-js="button-number"]');
    var $buttonCE = doc.querySelector('[data-js="button-ce"]');
    var $buttonOperation = doc.querySelectorAll('[data-js="button-operation"]');
    var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

    /*$buttonNumbers.forEach(function (button) {
        console.log(button);
    })*/
    Array.prototype.forEach.call($buttonNumbers, function (button) {
        button.addEventListener('click', handleClickNumber, false);
    });

    function handleClickNumber() {
        $visor.value += this.value;
    }

    /* Operações */
    Array.prototype.forEach.call($buttonOperation, function (button) {
        button.addEventListener('click', handleClickOperation, false);
    });

    function handleClickOperation() {
        $visor.value = removeLastItemIfItIsAnOperator($visor.value);
        $visor.value += this.value;
    }

    function isLastItemAnOperation(number) {
        var operations = ['+', '-', 'x', '÷'];
        var lastItem = number.split('').pop();
        return operations.some(function (operator) {
            return operator === lastItem;
        });

    }

    /* Remove o ultimo item se ele for um operador */
    function removeLastItemIfItIsAnOperator(number) {
        if (isLastItemAnOperation(number)) {
            return number.slice(0, -1);
        }
        return number;
    }


    /* button CE */
    $buttonCE.addEventListener('click', handleClickCE, false);

    function handleClickCE() {
        $visor.value = 0;
    }

    /* operadores */
    $buttonEqual.addEventListener('click', handleClickEqual, false);

    function handleClickEqual() {
        $visor.value = removeLastItemIfItIsAnOperator($visor.value);
        var allValues = $visor.value.match(/\d+[+x÷-]?/g);
        $visor.value = allValues.reduce(function (accumulated, actual) {
            var firstValue = accumulated.slice(0, -1);
            var operator = accumulated.split('').pop();
            var lastValue = removeLastItemIfItIsAnOperator(actual);
            var lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';
            switch (operator) {
                case '+':
                    return (Number(firstValue) + Number(lastValue)) + lastOperator;
                case '-':
                    return (Number(firstValue) - Number(lastValue)) + lastOperator;
                case 'x':
                    return (Number(firstValue) * Number(lastValue)) + lastOperator;
                case '÷':
                    return (Number(firstValue) / Number(lastValue)) + lastOperator;
            }
        });


    }


})(window, document)