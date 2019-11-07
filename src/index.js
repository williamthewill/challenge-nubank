const rl = require('./setup')
const goOperation = require('./lib/transaction');

rl.on('line', (dataOperation) => {
    try {
        const response = goOperation(JSON.parse(dataOperation));
        console.log(response)
    } catch (error) { }
    rl.prompt();
}).on('close', () => {
    process.exit(0);
});