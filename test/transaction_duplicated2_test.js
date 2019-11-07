const assert = require('assert');

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação não duplicada, com uma diferença de tempo entre as compras de limite maximo mais 1 milissegundo, 
        espera uma resposta sem mensagem de violação
    */
    test('create transaction ok (with limit milleseconds+1)', () => {
        const goOperation = require('../src/lib/transaction');
        const timeInterval = process.env.TIME_INTERVAL_DUPLICATED_TRANSACTION;

        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction1 = { "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T10:00:00.000Z" } };
        goOperation(dataOperationTransaction1);

        const dateOperarion2 = new Date('2019-02-13T10:00:00.000Z');
        dateOperarion2.setMilliseconds(timeInterval + 1);
        const dataOperationTransaction2 = { "transaction": { "merchant": "Burger King", "amount": 10, "time": dateOperarion2 } };
        const response = goOperation(dataOperationTransaction2);

        assert.ok(!response.violations.length);
    });
});