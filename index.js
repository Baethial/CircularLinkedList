// var buttonColors = ["red", "blue", "green", "yellow"];
// var gamePattern = [];
// var userClickedPattern = [];
// var started = false;
// var level = 0;

// //Starts the game with a keydown
// $(document).on("keydown", function () {
//     if (!started) {
//         started = true;
//         $("#level-title").html("Processing")
//         setTimeout(function () {
//             nextSecuence();
//         }, 300);
//     }
// })

// //function to reset the game
// function resetGame() {
//     userClickedPattern = [];
//     gamePattern = [];
//     started = false;
//     level = 0;
//     $("#level-title").html("Press A Key to Start");
// }

// //function to play a sound
// function playSound(name) {
//     var audio = new Audio("sounds/" + name + ".mp3");
//     audio.play();
// }

// //function to animate the pressed button
// function animatePress(currentColor) {
//     $("#" + currentColor).addClass("pressed");
//     setTimeout(function () {
//         $("#" + currentColor).removeClass("pressed");
//     }, 100);
// }

// //function to animate aa mistake in the secuence
// function animateMistake() {
//     $("#level-title").html("Game Over");
//     $("body").addClass("game-over");
//     playSound("wrong");
//     setTimeout(function () {
//         $("body").removeClass("game-over");
//         resetGame();
//     }, 300);
// }

// //function to add actions to the buttons
// $(".btn").on("click", function (event) {
//     if (started) {
//         var userChosenColor = event.target.id;
//         userClickedPattern.push(userChosenColor);
//         playSound(userChosenColor);
//         animatePress(userChosenColor);

//         if (!validateSecuence()) {
//             animateMistake();
//         } else if (userClickedPattern.length === gamePattern.length) {
//             userClickedPattern = [];
//             setTimeout(function () {
//                 nextSecuence();
//             }, 300);
//         }
//     };
// });

// //function to validate the secuence
// function validateSecuence() {
//     let i = 0;
//     while (i < userClickedPattern.length) {
//         if (userClickedPattern[i] !== gamePattern[i]) {
//             console.log("It breaks!")
//             return false;
//         }
//         i++;
//     }
//     console.log("Goes through!")
//     return true;
// }

// //function to generate the next step on the secuence
// function nextSecuence() {
//     var randomNumber = Math.floor(Math.random() * 4);
//     var randomChosenColour = buttonColors[randomNumber];
//     gamePattern.push(randomChosenColour);
//     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColour);
//     level++;
//     $("#level-title").html("Level " + level);
// }

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

// Example usage:
const csl = new CircularSinglyLinkedList();
csl.insertAtEnd("Client1", 1);
csl.insertAtEnd("Client2", 7);
csl.insertAtEnd("Client3", 2);
csl.insertAtEnd("Client4", 9);
csl.insertAtEnd("Client5", 7);
csl.insertAtEnd("Client6", 2);
csl.display();
while(!csl.isEmpty()) {
    csl.processTransactions();
    //csl.display();
}