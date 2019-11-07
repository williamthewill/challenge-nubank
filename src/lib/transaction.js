const { rulesNewAccount, rulesNewTransaction } = require('./rules');

// Atributos globais(apenas para o escopo de transaction) para contas e transações salvas
const accounts = new Map();
const transactions = new Map();

function saveAccount(newAccount) {
    violations = rulesNewAccount.checkRules(newAccount, accounts);
    if (!violations.length) {
        accounts.set(JSON.stringify(newAccount), newAccount);
    }
    return { ...newAccount, violations };
}

function decrementLimit(value) {
    accountKey = [...accounts.keys()][0];
    account = accounts.get(accountKey);

    // Decrementa do availableLimit da conta o amount da transação e atualiza a conta para o novo availableLimit
    account.account.availableLimit -= value;
}

function validateTransaction(newTransaction) {
    violations = rulesNewTransaction.checkRules(newTransaction, transactions, accounts);
    if (!violations.length) {
        transactions.set(newTransaction, newTransaction);
        decrementLimit(newTransaction.transaction.amount);
    }
    return { ...accounts.get([...accounts.keys()][0]), violations };
}

function goOperation(dataOperation) {
    let response = "invalid data";
    if (dataOperation.account) {
        response = saveAccount(dataOperation)
    } else if (dataOperation.transaction) {
        response = validateTransaction(dataOperation);
    }

    return response;
}

module.exports = goOperation;
