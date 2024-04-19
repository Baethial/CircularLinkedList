//Implementation of the Circular Doubly Linked List

//Node class
class Node {
    constructor(data) {
        this.data = data; //data that the node contains
        this.next = null; //pointer to the next node
        
    }
    getNext() {
        return this.next;
    }
    setNext(next) {
        this.next = next;
    }
    getData() {
        return this.data;
    }
}

//There are 2 types of nodes:
//Client Node
class ClientNode extends Node {
    constructor(data, tranNum) {
        super(data); 
        this.tranNum = tranNum; //Contains the number of transactions the client needs the cashier to process
    }
    //Gets the number of transactions the client needs the cashier to process
    getTranNumb() {
        return this.tranNum;
    }
    //Sets the number of transactions the client needs the cashier to process
    setTranNumb(tranNum) {
        this.tranNum = tranNum;
    }
    //Removes from the number of transactions the client needs the cashier to process
    removeTransactions(num) {
        if(num <= 0) return;
        if(this.tranNum <= num) {
            this.tranNum = 0;
        } else {
            this.tranNum -= num;
        }
    }
}

//Cashier Node
class CashierNode extends Node {
    constructor(data, maxTansNumber) {
        super(data);
        this.maxTranNumber = maxTansNumber; //The maximum number of transactions that can process per client each time
    }
    getMaxTranNumb() {
        return this.maxTranNumber;
    }
}

// CircularSinglyLinkedList class
class CircularSinglyLinkedList {
    constructor() {
        this.head = new CashierNode("Cashier", 5); //Max number of transactions per client
        this.tail = null;
    }

    isEmpty() {
        return this.tail === null;
    }

    processTransactions() {
        let client = this.head.next;
        if (client == this.head) {
            console.log("Queue is empty!");
        } else {
            let tranNumber = client.getTranNumb();
            console.log("Client " + client.getData());
            console.log("Number of transactions " + client.getTranNumb());
            let maxTranNumber = this.head.getMaxTranNumb();
            if (tranNumber > maxTranNumber) {
                client.removeTransactions(maxTranNumber);
                tranNumber -= maxTranNumber;
                this.moveFirstToEnd();
                console.log(maxTranNumber + " transactions were processed, " 
                + tranNumber + " transactions remaining. Client moved to end of queue");
            } else {
                client.removeTransactions(tranNumber);
                this.deleteAtStart();
                console.log("All " + tranNumber + " transactions were processed, client removed");
            }
        }
    }

    insertAtEnd(data, tranNum) {
        const newNode = new ClientNode(data, tranNum);
        if (this.isEmpty()) {
            this.tail = newNode;
            this.head.setNext(newNode);
            newNode.setNext(this.head);
        } else {
            let current = this.head.next; 
            while (current.next !== this.head) { //Before the tail
                current = current.next;
            }
            this.tail = newNode;
            current.setNext(newNode);
            newNode.setNext(this.head);
        }
    }

    //missing consideration when deleting last client
    deleteAtStart() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }
        let firstNode = this.head.next;
        if (firstNode.next == this.head) {
            this.tail = null;
        }
        let nextNode = firstNode.getNext();
        firstNode.setNext(null);
        this.head.setNext(nextNode);
    }

    moveFirstToEnd() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }
        let firstNode = this.head.next;
        if (firstNode.next === this.head) {
            // There's only one node in the list
            console.log("Only one node in the list. No need to move.");
            return;
        }
        //Remove from first position
        let nextNode = firstNode.getNext();
        this.head.setNext(nextNode);
        //Insert into last position
        let prevNode = this.tail;
        prevNode.setNext(firstNode);
        firstNode.setNext(this.head);
        this.tail = firstNode;
    }

    display() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }

        let current = this.head.next;
        do {
            if (current instanceof ClientNode) {
                console.log(current.getData() + ": " + current.getTranNumb());
                current = current.next;
            }
        } while (current !== this.head);
    }
}

// Create a CircularSinglyLinkedList instance
const csl = new CircularSinglyLinkedList();

// Function to update the animation display
function updateAnimation() {
    const animationContainer = document.getElementById("animation-container");
    animationContainer.innerHTML = ""; // Clear existing content

    // Add the cashier box
    const cashierBox = document.createElement("div");
    cashierBox.classList.add("box", "cashier-box");
    cashierBox.textContent = "Cashier";
    animationContainer.appendChild(cashierBox);

    // Display client boxes
    let current = csl.head.next;
    while (current !== csl.head) {
        const clientBox = document.createElement("div");
        clientBox.classList.add("box");
        if (current instanceof ClientNode) {
            clientBox.textContent = `${current.getData()} (${current.getTranNumb()})`;
        }
        animationContainer.appendChild(clientBox);
        current = current.next;
    }
}

// Function to process transactions with a delay
function processTransactionsWithDelay() {

    insertClientsWithProbability(csl);

    if (csl.isEmpty()) {
        console.log("Queue is empty");
        return;
    }

    setTimeout(() => {
        csl.processTransactions();
        updateAnimation();

        // Recursively call the function after 3 seconds if the queue is not empty
        if (!csl.isEmpty()) {
            processTransactionsWithDelay();
        }
    }, 2500); // Delay of 3 seconds (3000 milliseconds)
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a client name
function generateClientName() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = getRandomInt(1, 9999);
    const letterIndex = num % 26; // Generate a letter index from 0 to 25
    const letter = alphabet.charAt(letterIndex);
    return `Client ${letter}${num}`;
}

// Function to insert clients into the circular singly linked list
function insertClientsWithProbability(csl) {
    // Generate a random number between 1 and 100
    const probability = Math.floor(Math.random() * 100) + 1;

    // Add a client with a probability of 33%
    if (probability <= 33) {
        const clientName = generateClientName();
        const transactions = getRandomInt(1, 15);
        csl.insertAtEnd(clientName, transactions);
        console.log(`Added client: ${clientName}, Transactions: ${transactions}`);
    } else {
        console.log("No client added in this step.");
    }
}

// Example usage:
csl.insertAtEnd("Client A1", 1);
csl.insertAtEnd("Client B2", 7);
csl.insertAtEnd("Client C3", 2);
csl.insertAtEnd("Client D4", 9);
csl.insertAtEnd("Client E5", 7);
csl.insertAtEnd("Client F6", 2);

// Initial animation update
updateAnimation();

// Start processing transactions with delay
processTransactionsWithDelay();