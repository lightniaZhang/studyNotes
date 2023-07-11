<!--
 * @Author: 张远洪 zhyuanh@szlanyou.com
 * @Date: 2023-06-19 09:47:29
 * @LastEditors: 张远洪 zhyuanh@szlanyou.com
 * @LastEditTime: 2023-07-07 14:01:29
 * @FilePath: \笔记\studyNotes\前端\Javascript\ES6基础系列\ES6基础.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## Symbol

1.Symbol 是 es6 引入的新的原始数据类型，表示独一无二的值。Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

2.Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

3.Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```javascript
var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1; // Symbol(foo)
s2; // Symbol(bar)

s1.toString(); // "Symbol(foo)"
s2.toString(); // "Symbol(bar)"
```

4.如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。

```javascript
const obj = {
  toString() {
    return 'abc';
  },
};
const sym = Symbol(obj);
sym; // Symbol(abc)
```

5.Symbol 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。但使用 Symbol.for()创建的相同描述的 Symbol 值是相等的，详见[Symbol.for()](#symbolFor)

```javascript
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2; // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

s1 === s2; // false
```

6.Symbol 值不能与其他类型的值进行运算，会报错。

```javascript
var sym = Symbol('My symbol');

'your symbol is ' +
  sym // TypeError: can't convert symbol to string
  `your symbol is ${sym}`;
// TypeError: can't convert symbol to string
```

7.Symbol 值可以显式转为字符串

```javascript
var sym = Symbol('My symbol');

String(sym); // 'Symbol(My symbol)'
sym.toString(); // 'Symbol(My symbol)'
```

8.Symbol 值也可以转为布尔值，但是不能转为数值

```javascript
var sym = Symbol();
Boolean(sym); // true
!sym; // false

if (sym) {
  // ...
}

Number(sym); // TypeError
sym + 2; // TypeError
```

### Symbol 作为标识符

1.由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖

```javascript
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!',
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, {value: 'Hello!'});

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"
```

2.Symbol 值作为对象属性名时，不能用点运算符

```javascript
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'Hello!';
a[mySymbol]; // undefined
a['mySymbol']; // "Hello!"
```

上面代码中，因为点运算符后面总是字符串，所以不会读取 mySymbol 作为标识名所指代的那个值，导致 a 的属性名实际上是一个字符串，而不是一个 Symbol 值。

3.Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名

```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols;
// [Symbol(a), Symbol(b)]
```

### Symbol 方法

<span id='symbolFor'>1.Symbol.for()</span>  
用于将描述相同的 Symbol 变量指向同一个 Symbol 值

```javascript
Symbol.for('foo'); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for('foo'); // 从 symbol 注册表中读取键为"foo"的 symbol

Symbol.for('bar') === Symbol.for('bar'); // true
Symbol('bar') === Symbol('bar'); // false，Symbol() 函数每次都会返回新的一个 symbol

var sym = Symbol.for('mario');
sym.toString();
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串
```

**Symbol()与 Symbol.for()的对比**

- 它们定义的值类型都为"symbol"
- Symbol()定义的值不放入全局 symbol 注册表中，每次都是新建，即使描述相同值也不相等
- 用 Symbol.for() 方法创建的 symbol 会被放入一个全局 symbol 注册表中。Symbol.for() 并不是每次都会创建一个新的 symbol，它会首先检查给定的 key 是否已经在注册表中了。假如是，则会直接返回上次存储的那个。否则，它会再新建一个

  2.Symbol.keyFor()  
  作用：获取 symbol 注册表中与某个 symbol 关联的键。如果全局注册表中查找到该 symbol，则返回该 symbol 的 key 值，形式为 string。如果 symbol 未在注册表中，返回 undefined

```javascript
// 创建一个 symbol 并放入 Symbol 注册表，key 为 "foo"
var globalSym = Symbol.for('foo');
Symbol.keyFor(globalSym); // "foo"

// 创建一个 symbol，但不放入 symbol 注册表中
var localSym = Symbol();
Symbol.keyFor(localSym); // undefined，所以是找不到 key 的
```

### Symbol 内置属性

| 内置 Symbol 的值          | 调用时机                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Symbol.hasInstance        | 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法                                         |
| Symbol.isConcatSpreadable | 对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开。 |
| Symbol.species            | 创建衍生对象时，会使用该属性                                                                                       |
| Symbol.match              | 当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值                                        |
| Symbol.replace            | 当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值                                                   |
| Symbol.search             | 当该对象被 str. search (myObject)方法调用时，会返回该方法的返回值                                                  |
| Symbol.split              | 当该对象被 str. split (myObject)方法调用时，会返回该方法的返回值                                                   |
| Symbol.iterator           | 对象进行 for…of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器                                        |
| Symbol.toPrimitive        | 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值                                             |
| Symbol.toStringTag        | 在该对象上面调用 toString 方法时，返回该方法的返回值                                                               |
| Symbol. unscopables       | 该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除                                                         |

#### Symbol.hasInstance()

## Proxy

作用：用于修改某些操作的默认行为

语法

```javascript
let proxy = new Proxy(target, handler);
//target表示所要拦截的目标对象
//handler参数也是一个对象，用来定制拦截行为
```

注意，要使得 Proxy 起作用，必须针对 Proxy 实例进行操作，而不是针对目标对象进行操作。  
如果 handler 没有设置任何拦截，相当于直接通向原对象 target。

```javascript
let target = {};
let handler = {};
let proxy = new Proxy(target, handler);
proxy.a = 1;
console.log(target.a);
//1
```

Proxy 支持的拦截操作，一共 13 种
get()
方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

## Promise

Promise 对象是一个构造函数，用来生成 Promise 实例  
特点

## 字符串的扩展

#### 字符的 Unicode 表示法

javascript 支持 JavaScript 允许采用`\uxxxx`形式表示一个字符，其中“xxxx”表示字符的码

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符**固定为 2 个字节**。对于那些需要 4 个字节储存的字符（Unicode 码点大于 0xFFFF 的字符），JavaScript 会认为它们是两个字符，如汉字"𠮷"。ES6 支持对`\u0000——\uFFFF`范围外的字符解读，只需要将码点放入大括号即可正确解读字符

```javascript
𠮷; //𠮷
```

ES5 的字符串方法
1.charAt()  
返回指定位置的字符。但是 charAt()一次只能返回一个字节  
用法：
stringObject.charAt(index);//index 字符在字符串中的下标，下标从 0 开始

```javascript
let s = 'string';
let t = '新';
console.log(s.charAt(1)); //t
console.log(t.charAt(0)); //新
```

2.charCodeAt()  
返回字符两个字节的 Unicode 十进制值。

```javascript
let a = '𠮷';
console.log(a.charCodeAt(0)); //返回前两个字节的十进制值 55362
console.log(a.charCodeAt(1)); //返回后两个字节的十进制值 57271
```

3.String.fromCharCode()  
从码点返回对应字符，但是这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于 0xFFFF）

```javascript
String.fromCharCode(0x20bb7); // "ஷ"
```

上面代码中 String.fromCharCode 不能识别大于 0xFFFF 的码点，所以 0x20BB7 就发生了溢出，最高位 2 被舍弃了，最后返回码点 U+0BB7 对应的字符，而不是码点 U+20BB7 对应的字符。

ES6 字符串扩展方法  
1.codePointAt()  
能够正确处理 4 个字节储存的字符，返回一个字符码点的十进制数

```javascript
let a = '𠮷';
console.log(a.codePointAt(0)); //134071
console.log(a.codePointAt(1)); //57271

console.log(a.codePointAt(0).toString(16)); //20bb7
```

<font color="red">疑问：为什么打印索引值 1 仍有返回值？</font>

4.String.fromCodePoint()

```javascript
String.fromCodePoint(0x20bb7); // "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'; // true
```

String.fromCodePoint 方法有多个参数，则它们会被合并成一个字符串返回

注意，fromCodePoint 方法定义在 String 对象上，而 codePointAt 方法定义在字符串的实例对象上

