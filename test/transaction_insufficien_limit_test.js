const assert = require('assert')

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação com violação de saldo insuficiente,
        espera uma resposta com mensagem de violação de saldo insuficiente
    */
    test('create transaction rule: Insufficient Limit', () => {
        const goOperation = require('../src/lib/transaction');
        const insufficientLimitMessage = process.env.INSUFFICIENT_LIMIT_MESSAGE;

        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 10 } };
        goOperation(dataOperationAccount);

        const dataOperationTransaction = { "transaction": { "merchant": "Burger King", "amount": 100, "time": "2019-02-13T10:00:00.000Z" } };
        const response = goOperation(dataOperationTransaction);

        assert.equal(response.violations[0], insufficientLimitMessage);
    });
});
