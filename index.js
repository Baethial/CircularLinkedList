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
        this.prev = null; //pointer to the previous node
    }
}

class ClientNode extends Node {
    constructor(data, name, age) {
        super(data);
        this.name = name;
        this.age = age;
    }

    getClientDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

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

    // insertAtBeginning(data) {
    //     const newNode = new Node(data);
    //     if (this.isEmpty()) {
    //         this.head = newNode;
    //         this.tail = newNode;
    //         newNode.next = newNode;
    //         newNode.prev = newNode;
    //     } else {
    //         newNode.next = this.head;
    //         newNode.prev = this.tail;
    //         this.head.prev = newNode;
    //         this.tail.next = newNode;
    //         this.head = newNode;
    //     }
    // }

    // deleteAtEnd() {
    //     if (this.isEmpty()) {
    //         console.log("List is empty");
    //         return;
    //     }

    //     if (this.head === this.tail) {
    //         this.head = null;
    //         this.tail = null;
    //     } else {
    //         this.tail = this.tail.prev;
    //         this.tail.next = this.head;
    //         this.head.prev = this.tail;
    //     }
    // }

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
}

// Example usage:
const cll = new CircularDoublyLinkedList();
cll.insertAtEnd(1);
cll.insertAtEnd(2);
cll.insertAtBeginning(0);
cll.deleteAtEnd();
cll.deleteAtBeginning();
cll.display();
