#!/bin/bash
# ClawLink Backend 启动脚本

set -e

cd "$(dirname "$0")"

# 优先使用 3.12，避免旧环境落到 3.9 导致 `str | None` 语法报错
if command -v python3.12 >/dev/null 2>&1; then
    PYTHON_BIN="python3.12"
else
    PYTHON_BIN="python3"
fi

PY_VER=$("$PYTHON_BIN" -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
if [ "$PY_VER" != "3.12" ]; then
    echo "Python 3.12 required, got $PY_VER from $PYTHON_BIN" >&2
    exit 1
fi

# 创建虚拟环境（如果不存在）；若已有旧版本 .venv，则重建
if [ -x ".venv/bin/python" ]; then
    VENV_VER=$(.venv/bin/python -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
else
    VENV_VER=""
fi

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment with $PYTHON_BIN..."
    "$PYTHON_BIN" -m venv .venv
elif [ "$VENV_VER" != "3.12" ]; then
    echo "Rebuilding .venv with $PYTHON_BIN (found old Python ${VENV_VER:-unknown})..."
    rm -rf .venv
    "$PYTHON_BIN" -m venv .venv
fi

source .venv/bin/activate

# 安装依赖
echo "Installing dependencies..."
pip install -r requirements.txt -q

# 复制 .env（如果不存在）
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "Created .env from .env.example — please update with your keys."
fi

# 启动
echo "Starting ClawLink backend on http://localhost:8000"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
