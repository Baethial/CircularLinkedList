//***Start of the implementation of the Circular Singly Linked List***
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
    getTranNumb() {
        return this.tranNum;
    }
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
    // Method to check if the queue is empty (No clients)
    isEmpty() {
        return this.tail === null;
    }
    processTransactions() {
        let client = this.head.next;
        if (client == this.head) {
            console.log("Queue is empty!");
        } else {
            let tranNumber = client.getTranNumb();
            let actualClient = client.getData();
            let maxTranNumber = this.head.getMaxTranNumb();
            if (tranNumber > maxTranNumber) {
                client.removeTransactions(maxTranNumber);
                tranNumber -= maxTranNumber;
                this.moveFirstToEnd();
            } else {
                client.removeTransactions(tranNumber);
                this.deleteAtStart();
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
    // Method to display the queue in console - (debugging tool)
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
    // Not used
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
//***End of the implementation of the Circular Singly Linked List***


//***Start of support methods***
//Function to get a random color for each client
function getRandomColor() {
    const colors = [


        "#7400b8ff",
        "#6930c3ff",
        "#5e60ceff",
        "#5390d9ff",
        "#4ea8deff",
        "#48bfe3ff",
        "#56cfe1ff",
        "#64dfdfff",
        "#72efddff",
        "#80ffdbff",
        "#ff0a54ff",
        "#ff477eff",
        "#ff5c8aff",
        "#ff7096ff",
        "#ff85a1ff",
        "#ff99acff",
        "#fbb1bdff",
        "#f9bec7ff",
        "#f7cad0ff",
        "#fae0e4ff",
        "#007f5fff",
        "#2b9348ff",
        "#55a630ff",
        "#80b918ff",
        "#aacc00ff",
        "#bfd200ff",
        "#d4d700ff",
        "#dddf00ff",
        "#eeef20ff",
        "#ffff3fff",
        "#ff7b00ff",
        "#ff8800ff",
        "#ff9500ff",
        "#ffa200ff",
        "#ffaa00ff",
        "#ffb700ff",
        "#ffc300ff",
        "#ffd000ff",
        "#ffdd00ff",
        "#ffea00ff"
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to generate a client name
function generateClientName() {
    const names = [
        // Characters from Kaido's crew
        "Kaido",
        "King",
        "Queen",
        "Jack",
        "Kaido's All-Stars",
       
        // Characters from Luffy's crew
        "Monkey D. Luffy",
        "Roronoa Zoro",
        "Nami",
        "Usopp",
        "Sanji",
        "Tony Tony Chopper",
        "Nico Robin",
        "Franky",
        "Brook",
        "Jinbe",
       
        // Characters from Big Mom's crew
        "Charlotte Linlin (Big Mom)",
        "Charlotte Katakuri",
        "Charlotte Smoothie",
        "Charlotte Cracker",
        "Charlotte Perospero",
        "Charlotte Compote",
        "Charlotte Daifuku",
        "Charlotte Oven",
        "Charlotte Opera",
        "Charlotte Mont-d'Or",
        "Charlotte Galette",
        "Charlotte Brûlée",
        "Charlotte Pudding",
       
        // Characters from Shanks' crew
        "Shanks",
        "Benn Beckman",
        "Lucky Roo",
        "Yasopp",
       
        // Characters from Blackbeard's (Teach's) crew
        "Marshall D. Teach (Blackbeard)",
        "Jesus Burgess",
        "Shiliew",
        "Van Augur",
        "Laffitte",
        "Doc Q",
        "Stronger"
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}
//***End of support methods***


//***Start of animation methods***
// Function to update the animation display
function updateAnimation() {
    const animationContainer = document.getElementById("animation-container");
    animationContainer.innerHTML = ""; // Clear existing content


    // Add the cashier box
    const cashierBox = document.createElement("div");
    cashierBox.classList.add("box", "cashier-box");
    cashierBox.textContent = "Gol D. Roger";
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
        printOnScreen();
        current = current.next;
    }
}
//***End of animation methods***


//***Start of the Pocessing Simulation Methods***
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
        // Recursively call the function after 2 seconds if the queue is not empty
        if (!csl.isEmpty()) {
            processTransactionsWithDelay();
        }
    }, 2000); // Delay of 2 seconds (2500 milliseconds)
}


// Global variable to random probability
let globalRandom = null;


// Function to update the global random variable
function updateGlobalRandom() {
    globalRandom = getRandomInt(1, 100);
}


updateGlobalRandom();


const intervalID = setInterval(updateGlobalRandom, 2500);


// Function to insert clients into the queue with a 33% probability
function insertClientsWithProbability(csl) {
    // Generate a random number between 1 and 100
    const probability =globalRandom;
    // Add a client with a probability of 33%
    if (probability <= 33) {
        const clientName = generateClientName();
        const transactions = getRandomInt(1, 15);
        csl.insertAtEnd(clientName, transactions);
    } else {
        console.log("No client added in this step.");
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
//Function to populate the starting queue
function createRandomClientList(csl) {
    const numClients = getRandomInt(5, 10);
    for (let i = 0; i < numClients; i++) {
        const clientName = generateClientName();
        const transactions = getRandomInt(1, 15);
        csl.insertAtEnd(clientName, transactions);
    }
}
//***End of the Pocessing Simulation Methods***




//***Start of the printing information Method***
function printOnScreen() {
    let past = csl.tail;
    let current = csl.head.next
    let tranNumber = current.getTranNumb();
    let maxTranNumber = csl.head.getMaxTranNumb();
    let showText;
   
   //Print on screen the actual client
   let actualClient = current.getData();
   showText = document.getElementById("actualClient");
   showText.textContent = actualClient;
   
   //Print on screen the umber of transactions
   let numTransactions = tranNumber + " Actual transactions";
   showText = document.getElementById("numTransactions");
   showText.textContent = numTransactions;


    //Print on screen the actions executed by the cashier
    if (tranNumber > maxTranNumber) {
        setTimeout(function() {
            let queueState = maxTranNumber + " transactions were processed, "
        + (tranNumber - maxTranNumber)/*past.getTranNumb()/*tranNumber*/ + " transactions remaining. Client moved to end of queue";
        let showText = document.getElementById("queueState");
        showText.textContent = queueState;;
        }, 2000);
    } else {
        setTimeout(function() {
            let queueState = "All " + tranNumber + " transactions were processed, client removed";
            let showText = document.getElementById("queueState");
            showText.textContent = queueState;
        }, 2000);


    }


    //Print on screen the New clients
    if (globalRandom <= 33) {
        let newClientsAdd = `Added client: ${past.getData()}, Transactions: ${past.getTranNumb()}`;
        let showText = document.getElementById("newClientsAdd");
        showText.textContent = newClientsAdd;
       
    } else {
        let newClientsAdd = "No client added in this step.";
        let showText = document.getElementById("newClientsAdd");
        showText.textContent = newClientsAdd;
    }


    //Print on screen the max number of transactions
    let maxTransactions = "The maximum number of transactions is " + maxTranNumber;
    showText = document.getElementById("maxTransactions");
    showText.textContent = maxTransactions;
}
//***end of the printing information Methods***


//***Start of Example Execution***
// Create a CircularSinglyLinkedList instance
const csl = new CircularSinglyLinkedList();
// Initial queue
createRandomClientList(csl);
//Initial Animation Update
updateAnimation();
// Execution
executeParallelOperations();
//***End of Example Execution***




