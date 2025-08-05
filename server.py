import asyncio, os, logging
from fastmcp import FastMCP

logging.basicConfig(format="[%(levelname)s]: %(message)s", level=logging.INFO)
mcp = FastMCP("Math MCP Server")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

@mcp.tool()
def subtract(a: int, b: int) -> int:
    """Subtract two numbers."""
    return a - b

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    logging.info(f"MCP server listening on port {port}")
    asyncio.run(mcp.run_async(
        transport="streamable-http",
        host="0.0.0.0",
        port=port,
    ))
