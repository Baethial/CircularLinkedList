//Implementation of the Circular Doubly Linked List

//Node class
class Node {
    constructor(data) {
        this.data = data; //data that the node contains
        this.next = null; //pointer to the next node
        this.prev = null; //pointer to the previous node
    }

}

class ClientNode extends Node {
    constructor(data, name, age, transactionNum) {
        super(data);
        this.name = name;
        this.age = age;
        let min =1;
        let max =30;
        this.transactionNum = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getClientDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Numero de transacciones: ${this.transactionNum}`;
    }

    getClientTransactionNum() {
        return this.transactionNum;
    }
}
//const node = new ClientNode();
//console.log(node.getClientDetails());

const node = new ClientNode();
console.log(node.getClientTransactionNum());
class CashierNode extends Node {
    constructor(data, maxTansNumber) {
        super(data);
        this.maxTansNumber = maxTansNumber;
    }

    getCashierDetails() {
        return `Maximum number od transactions per client: ${this.maxTansNumber}`;
    }

    processTransactions() {
        if (this.next !== null) {

        }
    }
}

// CircularDoublyLinkedList class
class CircularDoublyLinkedList {
    constructor() {
        const data = {
            name: "Cashier Saskia",
            document: "1234"
        }
        const maxTansNumber = 5; //Max number of transactions per client
        const cashier = new CashierNode(data, maxTansNumber);
        this.head = cashier; 
        this.tail = null;
    }

    getMaxTansNumber() {
        let number = this.maxTansNumber;
        return `El maximo numero de transacciones permitidas es ${number}`;
    }

    

    isEmpty() {
        return this.tail === null;
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.prev = this.tail;
            newNode.next = this.head;
            this.tail.next = newNode;
            this.head.prev = newNode;
            this.tail = newNode;
        }
    }
//aqui estaba comentado
     insertAtBeginning(data) {
         const newNode = new Node(data);
         if (this.isEmpty()) {
             this.head = newNode;
             this.tail = newNode;
             newNode.next = newNode;
             newNode.prev = newNode;
         } else {
             newNode.next = this.head;
             newNode.prev = this.tail;
             this.head.prev = newNode;
             this.tail.next = newNode;
             this.head = newNode;
         }
     }

     deleteAtEnd() {
         if (this.isEmpty()) {
             console.log("List is empty");
             return;
         }

         if (this.head === this.tail) {
             this.head = null;
             this.tail = null;
         } else {
             this.tail = this.tail.prev;
             this.tail.next = this.head;
             this.head.prev = this.tail;
         }
     }

    deleteAtBeginning() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;
        }
    }

    display() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }

        let current = this.head;
        do {
            console.log(current.data);
            current = current.next;
        } while (current !== this.head);
    }
    
    nodeCount() {
        let nodesNumber = 0;
        let current = this.head;
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }
        do {
            nodesNumber= nodesNumber + 1;
            current = current.next;
        } while (current !== this.head);
        return nodesNumber;

        
    }

    informationDivDisplay(){

        //Div state of the queue
        let queueState
        let showText
        if (this.isEmpty()) {
            queueState = "Actualmente no se encuentran procesos activos"
            console.log("List is empty");
        }
        queueState = "Actualmente se encuentran " + cll.nodeCount() + " Procesos activos";
        showText = document.getElementById("queueState");
        showText.textContent = queueState;

        //Div Numbrer of nodes
        let nodesNumber= cll.nodeCount()
        console.log("UWU" + nodesNumber);
        showText = document.getElementById("nodeTotal");
        showText.textContent = nodesNumber;

        //Div max number of transactions
        
        let maxTransactions = cll.getMaxTansNumber();;
        showText = document.getElementById("maxTransactions");
        showText.textContent = maxTransactions;


    }


}

var nodeId = 0;
function newTransactionDiv() {
    
    // Crear un nuevo div
    let newDiv = document.createElement('div');
    newDiv.classList.add('newtransactionDiv');
    const cln = new ClientNode();
    cll.insertAtEnd(nodeId);

    
    let transactionNum = cll.getClientTransactionNum
    newDiv.textContent = `Id: ${nodeId} Numero de transacciones a realizar ${cln.getClientTransactionNum()}`;
    nodeId ++;
  
    // Agregar el nuevo div al contenedor
    let transactionQueue = document.getElementById('transactionQueue');
    transactionQueue.appendChild(newDiv);
    
  }

  const cln = new ClientNode();
  function updateDivs() {
    let divs = document.querySelectorAll('newtransactionDiv');
    divs.forEach(
        function(div) {
        let actualValue = cln.getClientTransactionNum();
        let newValue = actualValue - 5;
      
        // Actualizar el contenido del div con el nuevo valor
        div.textContent = newValue;
        console.log("owo de prueba");
    });
  }
  setInterval(updateDivs, 1000);

// Example usage:
const cll = new CircularDoublyLinkedList();


cll.insertAtEnd(1);
cll.insertAtEnd(2);
cll.insertAtEnd(5);
cll.insertAtEnd(6);
cll.insertAtBeginning(0);
cll.insertAtBeginning(8);
cll.deleteAtEnd();
cll.deleteAtBeginning();
cll.display();
cll.nodeCount();
cll.informationDivDisplay();
