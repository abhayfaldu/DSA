class Node {
    constructor(el) {
        this.data = el;
        this.next = null;
    }
}
class LinkedList {
    constructor(el) {
        this.head = null;
    }
    add(el) {
        var node = new Node(el);
        var curr;
        if (this.head === null) {
            this.head = node;
        } else {
            curr = this.head;
            while (curr.next != null) {
                curr = curr.next;
            }
            curr.next = node;
        }
    }

    // insert at the beginning of the list
    addAtBeginning(el) {
        let temp = new Node(el);
        temp.next = this.head;
        this.head = temp;
        return this.head;
    }
    r;

    // insert at the end of the list
    addAtEnd(el) {
        let temp = new Node(el);
        if (!this.head) {
            return (this.head = temp);
        } else {
            let curr = this.head;
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = temp;
            return this.head;
        }
    }

    // check if particular element is in the list
    isPresent(el) {
        if (!this.head) return false;
        let curr = this.head;
        while (curr) {
            if (curr.data === el) return true;
            curr = curr.next;
        }
        return false;
    }

    // insert after particular element
    insertAfterElement(el, element) {
        let curr = this.head;
        while (curr.data != element) {
            curr = curr.next;
        }
        let temp = new Node(el);
        temp.next = curr.next;
        curr.next = temp;
        return this.head;
    }

    // insert before particular element
    insertBeforeElement(el, element) {
        if (!this.head) return;
        if (!this.isPresent(element)) return;
        let temp = new Node(el);
        let curr = this.head;
        let prev = null;
        while (curr != null) {
            if (curr.data == element) {
                temp.next = curr;
                prev.next = temp;
                break;
            }
            prev = curr;
            curr = curr.next;
        }
        return this.head;
    }

    // delete the first node
    removeFirstNode() {
        this.head = this.head.next;
        return this.head;
    }

    // delete at last node
    removeLastNode() {
        let prev = null;
        let curr = this.head;
        while (curr.next != null) {
            prev = curr;
            curr = curr.next;
        }
        prev.next = null;
        return this.head;
    }

    // delete a particular node
    removeNode(element) {
        if (!this.head) return;
        if (!this.isPresent(element)) return;
        let curr = this.head;
        let prev = null;
        while (curr != null) {
            if (curr.data == element) {
                prev.next = curr.next;
                break;
            }
            prev = curr;
            curr = curr.next;
        }
        return this.head;
    }

    // delete before particular element
    removeBeforeElement(element) {
        if (!this.head) return;
        if (!this.isPresent(element)) return;
        let prev = null;
        let preprev = null;
        let curr = this.head;
        while (curr.data != element) {
            preprev = prev;
            prev = curr;
            curr = curr.next;
        }
        preprev.next = curr;
        return this.head;
    }

    // delete after particular element
    removeAfterElement(element) {
        if (!this.head) return;
        if (!this.isPresent(element)) return;
        let curr = this.head;
        while (curr.data != element) {
            curr = curr.next;
        }
        curr.next = curr.next.next;
        return this.head;
    }

    // reverse linked list
    reverseList() {
        if (!this.head) return;
        let curr = this.head;
        let prev = null;
        let next = null;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
        return this.head;
    }

    // find middle node of list
    addAtPosition(el, position) {
        let temp = new Node(el);
        let index = 0;
        let curr = this.head;
        let prev = null;
        while (index != position) {
            index++;
            prev = curr;
            curr = curr.next;
        }
        prev.next = temp;
        temp.next = curr;
        return this.head;
    }

    //print list
    printList() {
        let temp = this.head;
        if (temp == null) {
            return "empty";
            return;
        }
        let list = "";
        while (temp != null) {
            list += temp.data + " ";
            temp = temp.next;
        }
        return list;
    }

    //find the middle node ( for right is middle for odd length)
    findMiddleRight() {
        // one approch =========================== this is not interview friendly but for in case;

        // let count = 0;
        // let curr = this.head;
        // while (curr != null) {
        //     curr = curr.next;
        //     count++;
        // }
        // let count2 = 0;
        // let res = this.head;
        // let count1 = 0;
        // if (count % 2 !== 0) {
        //     count1 = count / 2 - 1;
        // } else {
        //     count1 = count / 2;
        // }
        // while (count2 < count1) {
        //     count2++;
        //     res = res.next;
        // }
        // console.log(res.data);

        // second approch  ======================= this will give right side middle in odd but if interviewer asks for left middle then use prev;

        let slow = this.head;
        let fast = this.head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        console.log(slow.data);
        return slow.data;
    }
    //find the middle node ( for left is middle for odd length)
    findMiddleLeft() {
        let count = 0;
        let curr = this.head;
        while (curr != null) {
            curr = curr.next;
            count++;
        }
        let count2 = 0;
        let res = this.head;
        while (count2 < count / 2 - 1) {
            count2++;
            res = res.next;
        }
        console.log(res.data);
    }

    // find Kth node from the end
    findKthNodeFromEnd(K) {
        let p = this.head;
        let q = this.head;
        let count = 0;
        while (count < K && p != null) {
            p = p.next;
            count++;
        }
        while (p != null) {
            p = p.next;
            q = q.next;
        }
        console.log(q.data);
        return q.data;
    }

    // floyd Cycle Detection Algo
	floydCycleDetectionAlgo() {
		let slow = this.head, fast = this.head;
		while (slow != null && fast != null && fast.next != null) {
			slow = slow.next;
			fast = fast.next.next;
			if (slow == fast) {
				return true;
			}
		}
		return false;
	};

	// romove repeated
	removeRepeated() {
		let curr = this.head.next;
		let prev = this.head
		while (curr != null) {
			if (curr.data == prev.data) {
				prev.next = curr.next;
			} else {
				prev = curr;
			}
			curr = curr.next;
		}
		return this.head;
	}

	// rotate right
	rotateRight(k) {
		for (let i = 0; i < k; i++) {
			let curr = this.head;
			while (curr.next != null) {
				curr = curr.next;
			}
			curr.next = this.head;
			this.head = curr;
		}
		return this.head;
	}

}
// merge two sorted list
// let mergeLists = () => {
// 	let one = l1.head;
// }
let l1 = new LinkedList();
let l2 = new LinkedList();
l1.add(1);
l1.add(1);
l1.add(2);
l2.add(2);
l2.add(3);
l2.add(4);
l2.add(5);
console.log(l1.printList());
console.log(l2.printList());
// l1.addAtBeginning(8);
// l1.addAtBeginning(9);
// console.log(l1.printList());
// l1.addAtEnd(10);
// l1.addAtEnd(11);
// console.log(l1.printList());
// console.log(l1.isPresent(2));
// console.log(l1.isPresent(129));
// console.log(l1.printList());
// l1.insertAfterElement(12, 3);
// l1.insertAfterElement(13, 6);
// console.log(l1.printList());
// l1.insertBeforeElement(14, 2);
// l1.insertBeforeElement(15, 5);
// console.log(l1.printList());
// l1.removeFirstNode();
// l1.removeFirstNode();
// console.log(l1.printList());
// l1.removeLastNode();
// l1.removeLastNode();
// console.log(l1.printList());
// l1.removeNode(10);
// l1.removeNode(6);
// console.log(l1.printList());
// l1.removeBeforeElement(2);
// l1.removeBeforeElement(5);
// console.log(l1.printList());
// l1.removeAfterElement(3);
// l1.removeAfterElement(1);
// console.log(l1.printList());
// l1.reverseList();
// console.log(l1.printList());
// l1.addAtPosition(32, 3);
// console.log(l1.printList());
// l1.findMiddleRight();
// l1.findMiddleLeft();
// console.log(l1.printList());
// l1.findKthNodeFromEnd(5);
// console.log(l1.printList());
// l1.removeRepeated();
// console.log(l1.printList());
// console.log(l1.printList());
// l1.rotateRight(2);
// console.log(l1.printList());