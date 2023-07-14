# Volta

### 1.官网

[Volta 官网](https://volta.sh/)

### 2.常用命令

命令形式：`volta [FLAGS] [SUBCOMMANDS]`

```powershell
FLAGS:
    -v, --version   查看当前volta版本
    -h, --help      查看帮助信息
    --verbose       Enables verbose diagnostics
    --quiet         Prevents unnecessary output

SUBCOMMANDS：
    fetch           允许将工具提取到本地缓存中，而无需将其设置为默认值或使其可用，以供将来离线使用。
    install         安装工具的默认版本。如果该工具尚未在本地缓存，它也会下载该工具。
    uninstall       删除任何已安装的全局包
    pin             更新项目package.json文件以使用选定版本的工具
    list            查看已安装的 Node 运行时、包管理器和带有二进制文件的包
    completions     为 shell 生成命令完成信息
    which           定位并打开 Volta 启动实际的二进制文件
    setup           Enables Volta for the current user / shell
    run             使用在命令行中指定的工具版本来运行提供的命令
    help            打印此消息或给定子命令的帮助
```

### 3.问题&解决方法
#### 切换工具全局默认版本
- 使用install命令

#### 卸载工具失败

