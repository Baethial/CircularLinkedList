var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Starts the game with a keydown
$(document).on("keydown", function () {
    if (!started) {
        started = true;
        $("#level-title").html("Processing")
        setTimeout(function () {
            nextSecuence();
        }, 300);
    }
})

//function to reset the game
function resetGame() {
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
    $("#level-title").html("Press A Key to Start");
}

//function to play a sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to animate the pressed button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//function to animate aa mistake in the secuence
function animateMistake() {
    $("#level-title").html("Game Over");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
        $("body").removeClass("game-over");
        resetGame();
    }, 300);
}

//function to add actions to the buttons
$(".btn").on("click", function (event) {
    if (started) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        if (!validateSecuence()) {
            animateMistake();
        } else if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSecuence();
            }, 300);
        }
    };
});

//function to validate the secuence
function validateSecuence() {
    let i = 0;
    while (i < userClickedPattern.length) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            console.log("It breaks!")
            return false;
        }
        i++;
    }
    console.log("Goes through!")
    return true;
}

//function to generate the next step on the secuence
function nextSecuence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level " + level);
}

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
        this.maxTansNumber = maxTansNumber; //The maximum number of transactions that can process per client each time
    }
}

// CircularSinglyLinkedList class
class CircularSinglyLinkedList {
    constructor() {
        const data = {
            name: "Cashier",
            document: "1234"
        }
        this.cashier = new CashierNode(data, 5); //Max number of transactions per client
        this.head = cashier; 
        this.tail = null;
    }

    isEmpty() {
        return this.tail === null;
    }

    processTransactions() {
        let client = this.next;
        if (client == null) {
            console.log("Queue is empty!");
        } else {
            let tranNumber = client.getTranNumb();
            if (tranNumber > this.maxTansNumber) {
                client.removeTransactions(this.maxTansNumber);
                tranNumber -= this.maxTansNumber;
                this.moveFirstToEnd();
            } else {
                client.removeTransactions(tranNumber);
                this.deleteAtStart();
            }
            nextClient.remo
        }
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (this.isEmpty()) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
    }

    deleteAtStart() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }

        let firstNode = this.head.next;
        if (firstNode.next === this.head.next) {
            // Only one node in the list
            console.log("Only one node in the list. Cannot remove.");
            return;
        }

        let current = firstNode;
        while (current.next !== firstNode) {
            current = current.next;
        }

        this.head.next = firstNode.next;
        current.next = this.head.next;
    }

    moveFirstToEnd() {
        if (this.isEmpty()) {
            console.log("List is empty");
            return;
        }

        let firstNode = this.head.next;
        if (firstNode.next === this.head.next) {
            // There's only one node in the list
            console.log("Only one node in the list. No need to move.");
            return;
        }

        let current = firstNode;
        while (current.next !== this.head.next) {
            current = current.next;
        }

        this.head.next = firstNode.next;
        current.next = firstNode;
        firstNode.next = this.head.next;
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
}

// Example usage:
const csl = new CircularSinglyLinkedList();
csl.insertAtEnd(1);
csl.insertAtEnd(2);
csl.insertAtEnd(3);
csl.deleteAtEnd();
csl.display();