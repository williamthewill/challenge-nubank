const assert = require('assert');

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação com sucesso,
        espera uma resposta sem mensagens de violação
    */
    test('create transaction ok', () => {
        const goOperation = require('../src/lib/transaction');
        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction = { "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T10:00:00.000Z" } };
        const response = goOperation(dataOperationTransaction);

        assert.ok(!response.violations.length);
    });
});