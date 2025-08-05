import asyncio
from fastmcp import Client

async def test():
    async with Client("http://localhost:8080/mcp") as client:
        tools = await client.list_tools()
        print("Tools:", [t.name for t in tools])
        print("4+5 =", (await client.call_tool("add", {"a": 4, "b": 5}))[0].text)
        print("10-3 =", (await client.call_tool("subtract", {"a": 10, "b": 3}))[0].text)

if __name__ == "__main__":
    asyncio.run(test())
