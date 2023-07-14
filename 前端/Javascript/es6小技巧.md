### 交换变量值

```javascript
let name1 = '张三',
  name2 = '李四';
[name1, name2] = [name2, name1];
//等价于 [name1, name2] = new Array(name2,name1);
//name1:李四，name2:张三
```
