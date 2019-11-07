const assert = require('assert');

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação com violação de conta inativa,
        espera uma resposta com mensagem de violação de conta inatia
    */
    test('create transaction rule: Inactive Account', () => {
        const goOperation = require('../src/lib/transaction');
        const inactiveAccountMessage = process.env.INACTIVE_ACCOUNT_MESSAGE;

        const dataOperationAccount = { "account": { "activeCard": false, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction = { "transaction": { "merchant": "Burger King", "amount": 10, "time": "2019-02-13T11:00:00.000Z" } };
        const response = goOperation(dataOperationTransaction);

        assert.equal(response.violations[0], inactiveAccountMessage);
    });
});