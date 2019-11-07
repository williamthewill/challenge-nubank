const assert = require('assert');

require('dotenv-safe').config();


suite('Transaction', () => {
    /* 
        Tenta realizar uma transação com valor de amount negativo,
        espera uma resposta com mensagem de violação de dados invalidos
    */
    test('transaction rule: Invalid Data', () => {
        const goOperation = require('../src/lib/transaction');
        const invalidDataMessage = process.env.INVALID_DATA_TRANSACTION;

        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction = { "transaction": { "merchant": "Burger King", "amount": -10, "time": "2019-02-13T11:00:00.000Z" } };
        const response = goOperation(dataOperationTransaction);

        assert.equal(response.violations[0], invalidDataMessage);
    });
});