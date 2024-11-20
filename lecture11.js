function parent(){
    let age = 20;
    function child(){
        age++;
        console.log(age);

    }
    return child();
}
parent()