## merge into 
### 1.语法
```sql
merge into [target_table] A using [sourse_table] on [[conditional expression] and [...]...]
when matched then
[update sql]
when not matched then
[insert sql]
```
运行原理：判断B表和A表中是否满足ON的条件，如果满足，使用B表更新A表，如果不满足，使用B表插入A表。

更新与插入操作可选择，可以只更新，也可以只插入，也可以同时进行。





