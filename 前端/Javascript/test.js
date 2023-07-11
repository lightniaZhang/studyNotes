const obj1 = { test: 1 }, obj2 = { test: 2 };
const ws = new WeakSet();
ws.add(obj1).add(obj2);
ws.has(obj1);