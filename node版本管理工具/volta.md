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
    fetch
    install         将工具安装到工具链中
    uninstall       从工具链中卸载工具
    pin             固定项目运行的工具版本
    list            显示当前的工具链
    completions     Generates Volta completions
    which           Locates the actual binary that will be called by Volta
    setup           Enables Volta for the current user / shell
    run             Run a command with custom Node, npm, pnpm, and/or Yarn versions
    help            打印指定的命令帮助信息或所有命令详情
```
