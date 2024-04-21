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
        this.color = getRandomColor();
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
            console.log(client.getData());

            let actualClient = client.getData();
            let showText = document.getElementById("actualClient");
            showText.textContent = actualClient;
            

            console.log("Number of transactions " + client.getTranNumb());
            let numTransactions = client.getTranNumb() + " Transactions left";
            showText = document.getElementById("numTransactions");
            showText.textContent = numTransactions;
            
            let maxTranNumber = this.head.getMaxTranNumb();
            if (tranNumber > maxTranNumber) {
                client.removeTransactions(maxTranNumber);
                tranNumber -= maxTranNumber;
                this.moveFirstToEnd();
                console.log(maxTranNumber + " transactions were processed, " 
                + tranNumber + " transactions remaining. Client moved to end of queue");

                let queueState = maxTranNumber + " transactions were processed, " 
                + tranNumber + " transactions remaining. Client moved to end of queue";
                let showText = document.getElementById("queueState");
                showText.textContent = queueState;
            } else {
                client.removeTransactions(tranNumber);
                this.deleteAtStart();
                console.log("All " + tranNumber + " transactions were processed, client removed");

                let queueState = "All " + tranNumber + " transactions were processed, client removed";
                let showText = document.getElementById("queueState");
                showText.textContent = queueState;
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
}

// Create a CircularSinglyLinkedList instance
const csl = new CircularSinglyLinkedList();

//Function to get a rando color for the clients
function getRandomColor() {
    const colors = ["#c1121f","#fdf0d5","#fb5607","#80ffdb","#7400b8","#ccff33","#006400","#ff9e00","#ffff3f","#17c3b2","#ff595e", "#ffca3a", "#38b000", "#1982c4", "#6a4c93"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

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
            clientBox.innerHTML = `${current.getData()} <br> #Transactions:${current.getTranNumb()}`;
            clientBox.style.backgroundColor = current.color;
            clientBox.style.borderColor = current.color;
        }
        animationContainer.appendChild(clientBox);
        current = current.next;
    }
}

// Function to process transactions with a delay
function processTransactionsWithDelay() {

    //insertClientsWithProbability(csl);

    if (csl.isEmpty()) {
        console.log("Queue is empty");
        return;
    }

    setTimeout(() => {
        csl.processTransactions();
        updateAnimation();

        // Recursively call the function after 2.5 seconds if the queue is not empty
        if (!csl.isEmpty()) {
            processTransactionsWithDelay();
        }
    }, 2500); // Delay of 2.5 seconds (2500 milliseconds)
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a client name
function generateClientName() {
    const names = ["Monkey D. Luffy", "Zoro", "Nami", "Usopp", "Sanji", "Tony Tony Chopper", "Nico Robin", "Franky", "Brook", "Jinbe"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
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

        let newClientsAdd = `Added client: ${clientName}, Transactions: ${transactions}`;
        let showText = document.getElementById("newClientsAdd");
        showText.textContent = newClientsAdd;


    } else {
        console.log("No client added in this step.");

        let newClientsAdd = "No client added in this step.";
        let showText = document.getElementById("newClientsAdd");
        showText.textContent = newClientsAdd;
    }
}

// Function to execute insertClientsWithProbability in parallel to processTransactionsWithDelay
async function executeParallelOperations() {
    // Execute insertClientsWithProbability in parallel
    const insertionPromise = new Promise(resolve => {
        setInterval(() => {
            insertClientsWithProbability(csl);
        }, 2500);
        resolve();
    });

    // Execute processTransactionsWithDelay
    await processTransactionsWithDelay();

    // Wait for the insertionPromise to resolve
    await insertionPromise;
}

// Example usage:
csl.insertAtEnd("Zoro", 1);
csl.insertAtEnd("Ussop", 7);
csl.insertAtEnd("Nami", 2);
csl.insertAtEnd("Monkey D. Luffy", 9);
csl.insertAtEnd("Nico Robin", 7);
csl.insertAtEnd("Jinbe", 2);

//Initial Animation Update
updateAnimation();

// Execution
executeParallelOperations();
