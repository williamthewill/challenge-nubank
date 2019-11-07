const assert = require('assert');

require('dotenv-safe').config();

suite('Account', () => {
    /* 
        Tenta recriar a conta, espera a mensagem de diolação de conta já inicializada
    */
    test('create account rule: Account Already Initialize', () => {
        const accountAlreadyInitializedMessage = process.env.ACCOUNT_ALREADY_INITIALIZED;
        const goOperation = require('../src/lib/transaction');
        const dataOperation = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperation);

        const response = goOperation(dataOperation);

        assert.equal(response.violations[0], accountAlreadyInitializedMessage);
    });
});
