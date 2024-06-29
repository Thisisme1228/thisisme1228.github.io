---
layout: left-none
title:  JavaScript二叉树
date:   2018-4-26 00:00:00 +0800
tag: JavaScript
---
* content
{:toc}
<hr>

二叉树

#### 使用代码实现排序二叉树构造逻辑

```
<script>
/* 排序二叉树 */
function binaryTree() {
    var node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    function insertNode(node,newNode) {
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
                str += node.left;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
                str += node.right;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }

    this.insert = function (key) {
        var newNode = new node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }
}

var tree = new binaryTree(),
     arr = [6,5,7,3,1,8,10,11,9],
     str = '';
arr.forEach(function (value) {
    tree.insert(value);
});
</script>
```

#### 获取排序二叉树中每个节点的信息

```
获取二叉树中每个节点也叫作遍历，二叉树的遍历分为三种：
1、前序遍历
2、中序遍历
3、后序遍历
```

#### 二叉树的中序遍历

```
中序遍历是以升序的方式进行遍历

代码：
<script>
/* 排序二叉树 */
function binaryTree() {
    var node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    function insertNode(node,newNode) {
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
                str += node.left;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
                str += node.right;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }

    this.insert = function (key) {
        var newNode = new node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }

    var inOrderTraverseNode = function (node,callback) {
      if(node != null){
          inOrderTraverseNode(node.left,callback);
          callback(node.key);
          inOrderTraverseNode(node.right,callback);
      }
    };

    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root,callback)
    }

}

var tree = new binaryTree(),
     arr = [6,5,7,3,1,8,10,11,9],
     str = '';
arr.forEach(function (value) {
    tree.insert(value);
});

var callback = function (key) {
    console.log(key);
}

tree.inOrderTraverse(callback)
</script>
```

#### 二叉树的前序遍历

```
<script>
/* 排序二叉树 */
function binaryTree() {
    var node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    function insertNode(node,newNode) {
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
                str += node.left;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
                str += node.right;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }

    this.insert = function (key) {
        var newNode = new node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }

    var previousTraverseNode = function (node,callback) {
        if(node!=null){
            callback(node.key);
            previousTraverseNode(node.left,callback)
            previousTraverseNode(node.right,callback)
        }
    }

    this.previousTraverse = function (callback) {
        previousTraverseNode(root,callback);
    }

}

var tree = new binaryTree(),
     arr = [6,5,7,3,1,8,10,11,9],
     str = '';
arr.forEach(function (value) {
    tree.insert(value);
});

var callback = function (key) {
    console.log(key);
}

tree.previousTraverse(callback)
</script>
```

#### 二叉树的后序遍历

```
<script>
/* 排序二叉树 */
function binaryTree() {
    var node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    function insertNode(node,newNode) {
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
                str += node.left;
            }else{
                insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
                str += node.right;
            }else{
                insertNode(node.right,newNode);
            }
        }
    }

    this.insert = function (key) {
        var newNode = new node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }

    var postTraverseNode = function (node,callback) {
        if(node!=null){
            postTraverseNode(node.left,callback)
            postTraverseNode(node.right,callback)
            callback(node.key);
        }
    }

    this.postTraverse = function (callback) {
        postTraverseNode(root,callback);
    }

}

var tree = new binaryTree(),
     arr = [6,5,7,3,1,8,10,11,9],
     str = '';
arr.forEach(function (value) {
    tree.insert(value);
});

var callback = function (key) {
    console.log(key);
}

tree.postTraverse(callback)
</script>
```

#### 二叉树获取最大值最小值

```
<script>
/* 排序二叉树 */
function binaryTree() {
    /* 节点 */
    var node = function (key) {
        this.left = null;
        this.key = key;
        this.right = null;
    };

    /* 根节点 */
    var root = null;

    var insertNode = function (root,node,callback) {
        if(root.key > node.key){
            if(root.left === null){
                root.left = node;
            }else{
                insertNode(root.left,node,callback);
            }
        }else if(root.key < node.key){
            if(root.right === null){
                root.right = node;
            }else{
                insertNode(root.right,node,callback);
            }
        }
    };

    this.insert = function (key,callback) {
        var newNode = new node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode,callback);
        }
    };

    var minValue = function (node,callback) {
        if(node.left !== null){
            return minValue(node.left,callback);
        }else{
            return callback(node.key);
        }
    };

    this.min = function (callback) {
        if(root != null){
            minValue(root,callback);
        }
    };

    var maxValue = function (node,callback) {
        if(node.right != null){
            return maxValue(node.right,callback)
        }else{
            return callback(node.key);
        }
    };

    this.max = function (callback) {
      if(root != null){
          maxValue(root,callback);
      }
    }
}

var tree = new binaryTree(),
    arr = [5,4,2,7,99,10,3,55,12,57,3114,89];

var callback = function (node) {
  console.log(node);
};

arr.forEach(function (value) {
    tree.insert(value,callback);
});

tree.min(callback);//获取最大值

tree.max(callback);//获取最小值

</script>
```

