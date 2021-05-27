(function (win, doc) {
    'use strict';

    /*
    Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
    o código, conforme vimos na aula anterior. Quebrar as responsabilidades
    em funções, onde cada função faça somente uma única coisa, e faça bem feito.
    - Remova as duplicações de código;
    - agrupe os códigos que estão soltos em funções (declarações de variáveis,
    listeners de eventos, etc);
    - faça refactories para melhorar esse código, mas de forma que o mantenha com a
    mesma funcionalidade.
    */

    var $visor           = doc.querySelector   ('[data-js="visor"]');
    var $buttonNumbers   = doc.querySelectorAll('[data-js="button-number"]');
    var $buttonCE        = doc.querySelector   ('[data-js="button-ce"]');
    var $buttonOperation = doc.querySelectorAll('[data-js="button-operation"]');
    var $buttonEqual     = doc.querySelector   ('[data-js="button-equal"]');


    function initialize() {
        initEvents();
    }

    function initEvents() {
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
    }


    function handleClickOperation() {
        $visor.value = removeLastItemIfItIsAnOperator($visor.value);
        $visor.value += this.value;
    }

    function isLastItemAnOperation(number) {
        var operations = getOperations();
        var lastItem = number.split('').pop();
        return operations.some(function (operator) {
            return operator === lastItem;
        });

    }
    function getOperations(){
        return Array.prototype.map.call($buttonOperation, function (button) {
            return button.value;
        });
    }

    function removeLastItemIfItIsAnOperator(string) {
        if (isLastItemAnOperation(string)) {
            return string.slice(0, -1);
        }
        return string;
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
        var allValues = $visor.value.match(getRegexOperations());
        $visor.value = allValues.reduce(calculaAllValues);
    }
    function getRegexOperations(){
        return new RegExp('\\d+[' + getOperations().join('') + ']?', 'g' );
    }

    function calculaAllValues(accumulated, actual) {
        var firstValue = accumulated.slice(0, -1);
        var operator = accumulated.split('').pop();
        var lastValue = removeLastItemIfItIsAnOperator(actual);
        var lastOperator = getLastOperator(actual);
        return doOperation(operator, firstValue, lastValue) + lastOperator;
    }
    function getLastOperator(value){
        return isLastItemAnOperation(value) ? value.split('').pop() : '';
    }

    function doOperation(operator, firstValue, lastValue){
        switch (operator) {
            case '+':
                return Number(firstValue) + Number(lastValue);
            case '-':
                return Number(firstValue) - Number(lastValue);
            case 'x':
                return Number(firstValue) * Number(lastValue);
            case '÷':
                return Number(firstValue) / Number(lastValue);
        }
    }
    initialize();
})(window, document)