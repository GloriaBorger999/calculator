const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('', () => {
    console.log("3...2...1")
    console.log("Launch!!")
});
eventEmitter.emit('')

const { readFile } = require('fs').promises

async function hello() {
    const hi = await readFile("./index.html", 'utf8')
    console.log("finished")
}
hello()

console.log(process.platform)