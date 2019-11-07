const assert = require('assert');

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação duplicada, com uma diferença de tempo entre as compras de 0, 
        espera uma mensagem de violação de transação duplicada
    */
    test('create transaction rule: Duplicated Transaction (with 0 milleseconds)', () => {
        const goOperation = require('../src/lib/transaction');
        const duplicatedTransactionMessage = process.env.DUPLICATED_TRANSACTION_MESSAGE;
        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction = { "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T10:00:00.000Z" } };
        goOperation(dataOperationTransaction);
        const response = goOperation(dataOperationTransaction);

        assert.equal(response.violations[0], duplicatedTransactionMessage);
    });
});