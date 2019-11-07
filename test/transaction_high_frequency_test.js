const assert = require('assert');

require('dotenv-safe').config();

suite('Transaction', () => {
    /* 
        Tenta realizar uma transação com violação de alta frenquência,
        espera uma resposta com mensagem de violação de alta frequência
    */
    test('create transaction rule: High Frenquency', () => {
        const goOperation = require('../src/lib/transaction');
        const highFrenquencyMessage = process.env.HIGH_FREQUANCY_MESSAGE;
        const timeInterval = process.env.TIME_INTERVAL_HIGH_FRENQUENCY;

        const dataOperationAccount = { "account": { "activeCard": true, "availableLimit": 100 } };
        goOperation(dataOperationAccount);

        const dateOperationTransaction1 = new Date('2019-02-13T10:00:00.000Z');
        const dataOperationTransaction1 = { "transaction": { "merchant": "Burger King", "amount": 10, "time": dateOperationTransaction1 } };
        goOperation(dataOperationTransaction1);

        const dateOperationTransaction2 = new Date('2019-02-13T10:00:00.000Z');
        dateOperationTransaction2.setMilliseconds(timeInterval / 3);
        const dataOperationTransaction2 = { "transaction": { "merchant": "Habbib's", "amount": 10, "time": dateOperationTransaction2 } };
        goOperation(dataOperationTransaction2);

        const dateOperationTransaction3 = new Date('2019-02-13T10:00:00.000Z');
        dateOperationTransaction3.setMilliseconds(timeInterval / 2);
        const dataOperationTransaction3 = { "transaction": { "merchant": "Burger King1", "amount": 10, "time": dateOperationTransaction3 } };
        goOperation(dataOperationTransaction3);

        const dateOperationTransaction4 = new Date('2019-02-13T10:00:00.000Z');
        dateOperationTransaction4.setMilliseconds(timeInterval);
        const dataOperationTransaction4 = { "transaction": { "merchant": "Habbib's1", "amount": 10, "time": dateOperationTransaction4 } };
        const response = goOperation(dataOperationTransaction4);

        assert.equal(response.violations[0], highFrenquencyMessage);
    });
});