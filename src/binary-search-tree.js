const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._insert(this.rootNode, data);
  }

  _insert(node, data) {
    if (node === null) {
      return new Node(data);
    }

    if (data < node.data) {
      node.left = this._insert(node.left, data);
    } else if (data > node.data) {
      node.right = this._insert(node.right, data);
    }

    return node;
  }

  has(data) {
    return this._contains(this.rootNode, data);
  }

  _contains(node, data) {
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    } else if (data < node.data) {
      return this._contains(node.left, data);
    } else {
      return this._contains(node.right, data);
    }
  }

  find(data) {
    return this._search(this.rootNode, data);
  }

  _search(node, data) {
    if (node === null || data === node.data) {
      return node;
    }

    if (data < node.data) {
      return this._search(node.left, data);
    } else {
      return this._search(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = this._remove(this.rootNode, data);
  }

  _remove(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this._remove(node.left, data);
    } else if (data > node.data) {
      node.right = this._remove(node.right, data);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this._findMin(node.right).data;
      node.right = this._remove(node.right, node.data);
    }

    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    return this._findMin(this.rootNode).data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
