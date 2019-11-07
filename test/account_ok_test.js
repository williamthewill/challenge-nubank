const assert = require('assert');

require('dotenv-safe').config();

suite('Account', () => {
    /* 
        Cria uma nova conta, espera uma resposta sem mensagens de violação
    */
    test('create account ok', () => {
        const goOperation = require('../src/lib/transaction');
        const dataOperation = { "account": { "activeCard": true, "availableLimit": 100 } };
        const response = goOperation(dataOperation);
        assert.ok(!response.violations.length);
    });
});
