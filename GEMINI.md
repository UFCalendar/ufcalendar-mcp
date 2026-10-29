# UFCalendar for Gemini CLI

This extension connects Gemini CLI to the UFCalendar MCP server at https://api.ufcalendar.com/mcp: UFC, PFL, OKTAGON, BKFC and RIZIN fight data. It covers every UFC event since UFC 1 (1993), full fight cards, results within minutes, round-by-round stats, fighter careers, the judges' scorecards, UFC rankings history since 2013 and consensus odds.

## Setup

1. Get a free key (500 requests a month, no card) at https://www.ufcalendar.com/account/api
2. Export it before you start Gemini CLI:

   export UFCALENDAR_API_KEY=ufcalendar_...

3. Restart Gemini CLI. The extension sends the key as `Authorization: Bearer`.

Listing tools, `get_plans`, `list_orgs` and `how_to_connect` work without a key. Every other tool needs one.

## Using it

- Ask in plain language: "who headlines the next UFC card?", "round-by-round stats for Topuria vs Volkanovski", "who was ranked #1 at lightweight on 2019-01-01?".
- One tool call = one request against your monthly quota.
- An auth error means UFCALENDAR_API_KEY is not set in the shell that launched Gemini CLI.
- Odds are one consensus line, information only, never betting advice.
- Docs: https://api.ufcalendar.com/docs
