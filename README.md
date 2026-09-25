# UFCalendar MCP server — UFC & MMA fight data for AI agents

`https://api.ufcalendar.com/mcp` is a hosted [Model Context Protocol](https://modelcontextprotocol.io) server over the UFCalendar Fight API: every UFC, PFL, OKTAGON, BKFC and RIZIN event since UFC 1 (1993), full fight cards, results within minutes of the official verdict, per-fight and per-round statistics, complete fighter careers, official judges' scorecards, UFC rankings history since 2013, the UFCalendar Power Index and model win probabilities, per-country broadcast rights, a change feed and the matchmaker.

There is nothing to install or run: it is a stateless Streamable-HTTP endpoint (POST JSON-RPC). Registry entry: [`com.ufcalendar/fight-api`](https://registry.modelcontextprotocol.io) · Docs: [api.ufcalendar.com/docs](https://api.ufcalendar.com/docs) · Pages: [UFC MCP server](https://www.ufcalendar.com/developers/ufc-mcp-server) · [MMA MCP server](https://www.ufcalendar.com/developers/mma-mcp-server)

## Connect

Get a key: free 1-day trial (100 requests, no card) at https://www.ufcalendar.com/account/api?trial=1, or sign in with a UFCalendar account from a client that speaks OAuth (Claude.ai, ChatGPT).

**Claude Code**
```bash
claude mcp add --transport http ufcalendar https://api.ufcalendar.com/mcp \
  --header "Authorization: Bearer $UFCALENDAR_API_KEY"
```

**Cursor** (`~/.cursor/mcp.json`)
```json
{"mcpServers":{"ufcalendar":{"url":"https://api.ufcalendar.com/mcp","headers":{"Authorization":"Bearer $UFCALENDAR_API_KEY"}}}}
```

**Codex** (`~/.codex/config.toml`)
```toml
[mcp_servers.ufcalendar]
url = "https://api.ufcalendar.com/mcp"
http_headers = { Authorization = "Bearer $UFCALENDAR_API_KEY" }
```

**Claude.ai** — Settings → Connectors → Add custom connector → paste the URL → sign in with your UFCalendar account.
**ChatGPT** — developer mode → add the URL as a connector → sign in.

Send `Accept: application/json, text/event-stream`. One tool call = one metered request against the same plan quota as REST. Three discovery tools need no credential.

## Tools (48)

| Tool | What it answers | Access |
|---|---|---|
| `get_plans` | Plans and quotas | no credential |
| `list_orgs` | List promotions | no credential |
| `how_to_connect` | How to connect | no credential |
| `get_org` | Get a promotion | any plan |
| `get_division` | Get a division | any plan |
| `list_events` | List events | any plan |
| `get_next_event` | Get the next event | any plan |
| `get_event_card` | Get an event and its full card | any plan |
| `get_event_changes` | Get an event’s change log | any plan |
| `list_changes` | List recent card changes | any plan |
| `how_to_watch` | How to watch an event | any plan |
| `get_event_storylines` | Get event storylines | any plan |
| `get_pickem_splits` | Get pick'em splits | any plan |
| `get_event_odds` | Get consensus odds for a card | any plan |
| `get_fight_odds` | Get consensus odds for a bout | any plan |
| `get_odds_history` | Get the odds line movement | Pro+ |
| `get_fight` | Get a bout | any plan |
| `find_fights` | Find fights | any plan |
| `search` | Search fighters and events | any plan |
| `search_fighters` | Search the roster | any plan |
| `get_fighter` | Get a fighter | any plan |
| `compare_fighters` | Compare two fighters | any plan |
| `get_rankings` | Get a rankings board | any plan |
| `get_champions` | Get current champions | any plan |
| `get_power_index` | Get the UFCalendar Power Index board | any plan |
| `get_matchmaker` | Get the matchmaker board | any plan |
| `whos_next` | Who should fight next | any plan |
| `get_leaderboard` | Get a stat leaderboard | any plan |
| `get_record_book` | Get the record book | any plan |
| `get_year_stats` | Get a year in review | any plan |
| `get_predictions_upcoming` | Get model win probabilities | any plan |
| `get_broadcast_rights` | Get broadcast rights | any plan |
| `list_judges` | List judges | any plan |
| `get_judge` | Get a judge | any plan |
| `get_judge_scorecards` | Get a judge’s scorecards | any plan |
| `list_split_decisions` | List split and majority decisions | any plan |
| `get_usage` | Get your API usage | any plan |
| `get_venue` | Get a venue | any plan |
| `search_venues` | Search venues | any plan |
| `get_venue_events` | List events at a venue | any plan |
| `search_articles` | Search UFCalendar articles | any plan |
| `get_article` | Get an article | any plan |
| `get_calendar_feed_url` | Get calendar feed URLs | any plan |
| `get_bulk_snapshot_url` | Get a bulk snapshot download URL | Enterprise |
| `list_webhook_endpoints` | List webhook endpoints | Pro+ |
| `create_webhook_endpoint` | Register a webhook endpoint | Pro+, write |
| `rotate_webhook_secret` | Rotate a webhook signing secret | Pro+, write |
| `delete_webhook_endpoint` | Delete a webhook endpoint | Pro+, write |

Five prompts ship too: `preview_card`, `tale_of_the_tape`, `results_recap`, `fight_week_briefing`, `record_book`. Resources: `ufcalendar://event/{slug}`, `ufcalendar://fighter/{slug}`, `ufcalendar://org/{slug}/rankings`.

Rules the server keeps: betting odds are one anonymised UFCalendar consensus line per bout (the mean across the sportsbooks we track, no sportsbook ever named), information only, not betting advice; judges' scorecards are the commission record only; every read tool is read-only and closed-world.

## Also
- Agent skill (endpoint reference + which-tool-for-which-question): `npx skills add UFCalendar/fight-api-skill` — https://github.com/UFCalendar/fight-api-skill
- TypeScript SDK `@ufcalendar/sdk` — https://github.com/UFCalendar/ufcalendar-typescript
- Python SDK `ufcalendar` — https://github.com/UFCalendar/ufcalendar-python
- OpenAPI: https://api.ufcalendar.com/openapi.json · llms.txt: https://api.ufcalendar.com/llms.txt

UFCalendar is not affiliated with UFC/Zuffa/TKO or any promotion. Plans and pricing: https://www.ufcalendar.com/developers
