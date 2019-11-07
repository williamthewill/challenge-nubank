const assert = require('assert');

require('dotenv-safe').config();

suite('Account', () => {
    /* 
        Tenta atualizar a conta já existente, epera uma mensagem de violação de conta já inicializada
    */
    test('create account rule: Account Not Updated', () => {
        const goOperation = require('../src/lib/transaction');
        const accountAlreadyInitializedMessage = process.env.ACCOUNT_ALREADY_INITIALIZED;

        const dataOperation1 = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperation1);

        const dataOperation2 = { "account": { "activeCard": true, "availableLimit": 200 } };
        const response = goOperation(dataOperation2);

        assert.equal(response.violations[0], accountAlreadyInitializedMessage);
    });
});