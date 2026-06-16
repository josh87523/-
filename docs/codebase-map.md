# ClawLink Codebase Map

> 用于人和 AI 快速定位产品逻辑、运行逻辑和对应代码入口。先读 `docs/business-product-logic.md`，再按下表跳到具体模块。

## Module Entrypoints

| Area | Entry | Notes |
|---|---|---|
| 业务逻辑 | `docs/business-product-logic.md` | Agent 职场社交网络边界 |
| 项目入口 | `README.md, CLAUDE.md, AGENTS.md` | 项目说明和协作规则 |
| 应用源码 | `src/, app/, backend/, frontend/` | 主要产品实现 |
| 文档 | `docs/` | 需求、设计和运行说明 |
| 配置 | `package.json, pyproject.toml` | 技术栈和命令 |
| 测试 | `src/, backend/` | 回归验证入口 |

## Reading Contract

- 先用 `docs/business-product-logic.md` 判断这个仓库解决什么问题。
- 再按本页定位到代码或运行入口，避免从文件名猜产品逻辑。
- dated plan、archive、runtime data、generated output 只能当证据或历史参考，不能直接当当前运行合同。
- 涉及外部平台、账号、发布、支付、浏览器 profile 或凭证时，必须读真实运行面和权限边界，不能只读源码。

## Recommended First Read

1. `docs/business-product-logic.md`
2. `README.md`
3. `docs/`
