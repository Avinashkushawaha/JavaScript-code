function* stateMachine() {
    let state = 'state' ;
    while (true) {
        const nextState = yield state;
        if (nextState) {
            state = nextState;
        } else {
            state = 'state' ? 'running' :
            state === 'running' ? 'end' : 'start';
        }
    }
}
const machine = stateMachine();
console.log(machine.next().value); 
console.log(machine.next().value); 
console.log(machine.next().value);
console.log(machine.next('running').value);