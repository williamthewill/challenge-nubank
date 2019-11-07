const assert = require('assert');

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação duplicada, com uma diferença de tempo do limite máximo, 
        espera uma mensagem de violação de transação duplicada
    */
    test('create transaction rule: Duplicated Transaction (with limit milleseconds)', () => {
        const goOperation = require('../src/lib/transaction');
        const duplicatedTransactionMessage = process.env.DUPLICATED_TRANSACTION_MESSAGE;
        const timeInterval = process.env.TIME_INTERVAL_DUPLICATED_TRANSACTION;

        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction1 = { "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T10:00:00.000Z" } };
        goOperation(dataOperationTransaction1);

        const dateOperarion2 = new Date('2019-02-13T10:00:00.000Z');
        dateOperarion2.setMilliseconds(timeInterval);
        const dataOperationTransaction2 = { "transaction": { "merchant": "Burger King", "amount": 10, "time": dateOperarion2 } };
        const response = goOperation(dataOperationTransaction2);

        assert.equal(response.violations[0], duplicatedTransactionMessage);
    });
});