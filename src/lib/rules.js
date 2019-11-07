require('dotenv-safe').config();

module.exports.rulesNewAccount = (() => {

    // Conta não deve ser atualizada
    function isUpdate(accounts) {
        return !!accounts.size;
    }

    // Conta não deve ser recriada
    function isExists(newAccount, accounts) {
        return !!accounts.get(JSON.stringify(newAccount));
    }

    function checkRules(newAccount, accounts) {
        const violations = [];
        const accountAlreadyInitializedMessage = process.env.ACCOUNT_ALREADY_INITIALIZED;
        if (isExists(newAccount, accounts) || isUpdate(accounts)) violations.push(accountAlreadyInitializedMessage);
        return violations;
    };

    return { checkRules };
})();

module.exports.rulesNewTransaction = (() => {
    // Não deve haver mais de 3 transações em um intervalo de 2 minutos
    function highFrenquency(newTransaction, transactions) {
        const transactionsSize = transactions.size;
        const qtdTransactions = process.env.TRANSACTIONS_QUANTITY_HIGH_FRENQUENCY;

        if (transactionsSize < qtdTransactions) return false;

        const timeInterval = process.env.TIME_INTERVAL_HIGH_FRENQUENCY;
        // retorna todas as transações em forma de array
        const transationsArr = [...transactions];

        // Subtrai  a data da terceira transação mais antiga com a nova transação
        const diffInMillis = new Date(newTransaction.transaction.time) - new Date(transationsArr[transactionsSize - 3][1].transaction.time);

        return diffInMillis > timeInterval ? false : true;
    }

    // Nenhuma transação deve ser aceita quando o cartão não está ativo
    function inactiveAccount(accounts) {
        accountKey = [...accounts.keys()][0];
        account = accounts.get(accountKey);

        return !account.account.activeCard;
    }

    // Não deve haver mais de duas transações semelhantes (mesma quantidade e comerciante) em um intervalo de dois minutos
    function isDuplicatedTransaction(newTransaction, transactions) {
        if (transactions.size === 0) return false;

        const timeInterval = process.env.TIME_INTERVAL_DUPLICATED_TRANSACTION;

        // Pega todas as transações coloca num array depois pega a ultima transação
        const lastTransaction = [...transactions][transactions.size - 1][1].transaction;
        const merchantLastTransaction = lastTransaction.merchant;
        const amountLastTransaction = lastTransaction.amount;
        const timeLastTransaction = new Date(lastTransaction.time);
        const timeNewTransaction = new Date(newTransaction.transaction.time);
        const diffInMillis = timeNewTransaction - timeLastTransaction;

        if (
            newTransaction.transaction.merchant === merchantLastTransaction &&
            newTransaction.transaction.amount === amountLastTransaction &&
            diffInMillis <= timeInterval
        )
            return true;

        return false;
    }

    // O valor da transação não deve exceder o limite disponível
    function limitInsufficient(newTransaction, accounts) {
        accountKey = [...accounts.keys()][0];
        account = accounts.get(accountKey);
        return account.account.availableLimit < newTransaction.transaction.amount;
    }

    function checkRules(newTransaction, transactions, accounts) {
        const violations = [];
        const insufficientLimitMessage = process.env.INSUFFICIENT_LIMIT_MESSAGE;
        const duplicatedTransactionMessage = process.env.DUPLICATED_TRANSACTION_MESSAGE;
        const highFrenquencyMessage = process.env.HIGH_FREQUANCY_MESSAGE;
        const inactiveAccountMessage = process.env.INACTIVE_ACCOUNT_MESSAGE;
        const invalidDataMessage = process.env.INVALID_DATA_TRANSACTION;

        if (newTransaction.transaction.amount < 0) violations.push(invalidDataMessage);
        if (limitInsufficient(newTransaction, accounts)) violations.push(insufficientLimitMessage);
        if (isDuplicatedTransaction(newTransaction, transactions)) violations.push(duplicatedTransactionMessage);
        if (highFrenquency(newTransaction, transactions)) violations.push(highFrenquencyMessage);
        if (inactiveAccount(accounts)) violations.push(inactiveAccountMessage);
        return violations;
    };

    return { checkRules };
})();
