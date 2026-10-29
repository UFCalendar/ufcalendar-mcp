// Next UFC card. node examples/node/quickstart.mjs (Node 18+)
// Free key (500 requests/month, no card): https://www.ufcalendar.com/account/api
const res = await fetch("https://api.ufcalendar.com/v1/events?org=ufc&status=upcoming&limit=1", {
  headers: { Authorization: `Bearer ${process.env.UFCALENDAR_API_KEY}` },
});
const { data } = await res.json();
console.log(data[0].title, data[0].starts_at);
