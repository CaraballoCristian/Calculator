const calculator = () => {
    var screen = document.getElementById('scrn')
    const cleanBtn = document.getElementById('clean');
    const backspaceBtn = document.getElementById('backspace');
    const operationsBtns = document.querySelectorAll('.operaciones');
    const equalBtn = document.getElementById('equal');
    const numerosBtns = document.querySelectorAll('.numeros');
    let firstNmbr = "";
    let lastNmbr = "";
    let lastOper = "";
    let ans = "";
    let lastDig = "";
    let lastDel = "";

    //Defino limpiezas
    const clear = () => {
        screen.value = ""; 
        ans = "";
        lastOper = "";
        firstNmbr = "";
        lastNmbr = "";
    }

    const backspace = () => {
        let aux = "";

        lastDel = screen.value[screen.value.length - 1];
        screen.value = screen.value.substr(0, screen.value.length - 1);
        
        if (lastDel == "+" || lastDel == "-" || lastDel == "*" || lastDel == "/" || lastDel == "^") {
            lastOper = "";

        }else { //-> implica que fue un numero o un punto.
            if(firstNmbr !== "" && (lastNmbr == "" || lastNmbr == '0')) { //-> implica que estoy editando el firtNmbr
                firstNmbr = firstNmbr.substr(0, firstNmbr.length - 1);
            
            }else if (firstNmbr !== "" && lastNmbr !== ""){ //-> implica q estoy editando el lastNmbr
                lastNmbr = lastNmbr.substr(0, lastNmbr.length - 1);
            
            }else { //implica que estoy editando el ans
                aux = ans.toString();
                ans = aux.substr(0, aux.length - 1);
            }
        }
    }

    //defino La funcion de calculo
    let calculate = () => {
        let a = "";
        let b = "";
        
        if (ans == ""){
            a = parseFloat(firstNmbr);
            b = parseFloat(lastNmbr);
        } else {
            a = ans;
            b = parseFloat(firstNmbr);
        }
        
        switch(lastOper) {
            case '+': 
                ans = a+b; 
                break;  
            case '-': 
                ans = a-b; 
                break;
            case '*': 
                ans = a*b; 
                break;
            case '/': 
                ans = a/b; 
                break;
            case '^': 
                ans = a**b;
        }
        firstNmbr = "";
        lastNmbr = "";
        lastOper = "";
        console.log(ans);
        return ans;
    };

    //dActualizo los Operandos
    const addNumber = (nmbr) => {                                             
        screen.value += nmbr; 
        if (lastOper == "" || ans !== "") {
            firstNmbr += nmbr;
        }else {
            lastNmbr += nmbr;
        }
    };

    //Actualizo los Operadores
    const addOper = (oper) => {
        if (lastOper == "") {
            lastOper = oper;
        }else {
            if (lastDig == 'operation'){
                screen.value = screen.value.substr(0, screen.value.length - 1);
                lastOper = oper;
            }else{
                screen.value = calculate();
                lastOper = oper;
            }
            console.log(lastDig);       
        }
        screen.value += lastOper;
    }

    //Defino eventListeners
    cleanBtn.addEventListener('click', () => clear());
    backspaceBtn.addEventListener('click', () => backspace());                  
    equalBtn.addEventListener('click', () => screen.value = calculate());

    numerosBtns.forEach(numero => {
        numero.addEventListener('click', () => {
            addNumber(numero.value);
            lastDig = "number";
        });
    });

    operationsBtns.forEach(operation => {
        operation.addEventListener('click', () => {
            addOper(operation.value);
            lastDig = "operation";
        });
    });
}
calculator();