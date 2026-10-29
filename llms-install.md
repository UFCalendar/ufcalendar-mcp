# Installing the UFCalendar MCP server

The server is hosted; there is nothing to build.

- URL: `https://api.ufcalendar.com/mcp` (Streamable HTTP, stateless)
- Auth: `Authorization: Bearer <key>`, or OAuth sign-in for clients that support it (Claude.ai, ChatGPT)
- Key: free plan, 500 requests a month, no card: https://www.ufcalendar.com/account/api
- Without a key, `get_plans`, `list_orgs` and `how_to_connect` still answer.

Client configs:

```json
{"mcpServers":{"ufcalendar":{"type":"http","url":"https://api.ufcalendar.com/mcp","headers":{"Authorization":"Bearer ${UFCALENDAR_API_KEY}"}}}}
```

For clients that only launch local processes: `npx -y github:UFCalendar/ufcalendar-mcp` with `UFCALENDAR_API_KEY` set (a stdio bridge to the hosted server).
