## Set

ES6 新增的数据类型，类似于数组，成员值唯一。Set 也是构造函数，可用于生成 Set 数据结构

### 1.创建语法

```javascript
new Set(iterable); //iterable可选，值为可迭代对象，如数组、类数组对象、字符串均可
```

### 2.Set的属性和方法

#### constructor

- 构造函数，默认 Set 函数

```javascript
let s = new Set();
s.constructor; // ƒ Set() { [native code] }
```

#### size

- 返回 Set 实例的成员数量

```javascript
let s = new Set([1, 2, 3]);
s.size; // 3
```

#### add(value)

- 添加实例成员，返回 Set 实例本身

```javascript
let s = new Set();
s.add(1); //Set { 1 }
s.add(2); //Set { 1,2 }
```

- add 方法可以通过链式调用添加成员

```javascript
s.add(1).add(2); //Set { 1,2 }
```

#### delete(value)

- 删除传入值，返回布尔值表明是否删除成功

```javascript
let s = new Set([1, 2, 3]);
let delResults1 = s.delete(1); //delResults1:true, s:Set { 1,2 }
```

#### clear()

- 清空 Set 实例成员，无返回值

```javascript
let s = new Set([1, 2, 3]);
s.clear(); //Set {}
```

#### forEach(callbackfn(value,key,set),thisArg)

- 对每个成员进行遍历操作，无返回值
- `callbackfn`为遍历回调函数，可传入三个参数:
`value`:成员值,
`key`：成员键，由于Set对象中没有key，默认取value值,
`set`：被遍历的Set实例
- `thisArg`为回调函数的`this`值


```javascript  
let s = new Set([1, 2, 3]);
s.forEach((value, key) => {
  console.log(`${key}:${value}`);
  // 1:1
  // 2:2   
  // 3:3
})

let t = [1, 1, 1];
s.forEach((value, key) => {
  console.log(`${key}:${value}`);
  // 1:1
  // 1:1  
  // 1:1
}, t)
```


#### has(value)

- 返回一个布尔值，表示该值是否是 Set 实例的成员

```javascript
let s = new Set([1, 2, 3]);
s.has(1); //true
```

#### entries()
- 返回一个新的键值对迭代器对象

```javascript
let s = new Set([1, 2, 3]);
s.entries();// { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] }
```

#### values()、keys()
- 返回一个新的迭代器对象
- `keys()`方法只是`values()`方法的别名

```javascript
let s = new Set([1, 2, 3]);
s.keys();// { 1,2,3 }
s.values();// { 1,2,3 }
```
### 3.应用
利用扩展运算符`...`和`Set`结构结合，可以对数据去重

```javascript
let arr1 = [1,1,2,3,3];
let unique = [...new Set(arr1)]; // [ 1, 2, 3 ]
```

## WeakSet
与`Set`类似，是一些不重复的对象的集合
与Set的区别
- 成员只能是对象
- 集合中的对象引用为弱引用。如果没有其他的对 WeakSet 中对象的引用，那么这些对象会被当成垃圾回收掉

### 1.创建语法
```javascript
new WeakSet(iterable); //iterable可选，值为可迭代对象，如数组、类数组对象、字符串均可
```

### 2.WeakSet属性和方法
#### add(value)
- 向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身
```javascript
const ws = new WeakSet();
const obj = [1,2];
ws.add(obj); //
```

#### delete(value)
- 清除 WeakSet 实例的指定成员，清除成功返回true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回false。
```javascript
const obj1 = { test: 1 }, obj2 = { test: 2 };
const ws = new WeakSet();
ws.add(obj1).add(obj2);
ws.delete(obj1);// true
```


### has(value)
- 返回一个布尔值，表示某个值是否在 WeakSet 实例之中
```javascript
const obj1 = { test: 1 }, obj2 = { test: 2 };
const ws = new WeakSet();
ws.add(obj1).add(obj2);
ws.has(obj1);// true
```
