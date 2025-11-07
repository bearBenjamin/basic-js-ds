const { NotImplementedError } = require("../lib/errors");
// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    //console.log("this.root: ", this._root);
    return this._root;
  }

  add(data) {
    const newNode = { data: data, left: null, right: null };

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let currentNode = this._root;

    while (true) {
      if (currentNode.data === data) {
        return;
      }

      if (currentNode.data > data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  find(data) {
    let currentNode = this._root;

    while (currentNode !== null) {
      if (data === currentNode.data) {
        return currentNode;
      }

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  has(data) {
    let desiredNode = this.find(data);

    if (desiredNode !== null) {
      return true;
    }
    return false;
  }

  remove(data) {
    let parentNode = null;
    let currentNode = this._root;
    
    while (currentNode !== null && currentNode.data !== data) {
      parentNode = currentNode;
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
    // Если узел не найден, выходим
    if (currentNode === null) {
      return;
    }

    // Узел - лист (без потомков)
    if (currentNode.left === null && currentNode.right === null) {
      if (parentNode === null) {
        // Узел является корнем
        this._root = null;
      } else if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
      return;
    }

    // Узел имеет одного потомка
    if (currentNode.left === null || currentNode.right === null) {
      const child = currentNode.left || currentNode.right;
      if (parentNode === null) {
        // Узел является корнем
        this._root = child;
      } else if (parentNode.left === currentNode) {
        parentNode.left = child;
      } else {
        parentNode.right = child;
      }
      return;
    }
    // Узел имеет двух потомков
    let successorParent = currentNode;
    let successor = currentNode.right;
    
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }
    
    // Заменяем данные узла данными преемника
    currentNode.data = successor.data;
    
    // Удаляем преемника
    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  min() {
   if (this._root === null) {
      return null;
    }
    
    let currentNode = this._root;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    
    return currentNode.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }
    
    let currentNode = this._root;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
