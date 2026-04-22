"""Workspace-routed LLM client."""

import asyncio
import logging
import sys
from pathlib import Path

from app.config import settings

SHARED_CONTEXT = Path("/Users/obayotian/Workspace/claude-shared-context")
if str(SHARED_CONTEXT) not in sys.path:
    sys.path.insert(0, str(SHARED_CONTEXT))

from model_router import TaskType, call_ai

log = logging.getLogger(__name__)


async def chat(
    prompt: str,
    system: str = "You are a helpful professional networking assistant.",
    temperature: float = 0.7,
) -> str:
    """Route one text completion through the shared workspace model router."""

    def _call() -> str:
        return call_ai(
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": prompt},
            ],
            task=TaskType.STRUCTURED,
            temperature=temperature,
            caller="clawlink:llm_client",
        )

    try:
        text = await asyncio.to_thread(_call)
    except Exception as exc:
        log.exception("Workspace-routed LLM call failed")
        return f"[LLM unavailable: {exc}]"

    if not text:
        log.warning("Workspace-routed LLM returned empty response")
        return "[LLM unavailable: empty response]"
    return text
