class QueueWithStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    
   enqueue(value){
    this.inStack(val);
   }

   dequeue(){
    if(this.outStack.length === 0){
        while(this.inStack.length > 0){
            this.outStack.push(this.inStack.pop());
        }
    }
    return this.outStack.pop();
   }

   peek(){
    if(this.outStack.length === 0){
        while(this.inStack.length > 0){
            this.outStack.push(this.inStack.pop());
        }
    }
    return this.outStack[this.outStack.length - 1];
   }

   empty(){
    return this.inStack.length === 0 && this.outStack.length === 0;
   }
}