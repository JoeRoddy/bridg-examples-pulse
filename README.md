# Bridg + Pulse!

### Up and Running

1. `git clone https://github.com/JoeRoddy/bridg-examples-pulse` and cd into directory
2. `touch .env.local`
3. Open `.env.local` and add your DB connection string and Pulse API key:

```
DATABASE_URL=postgres://postgres...
PULSE_API_KEY=...
```

4. `npm install`
   - NOTE: You <u>MUST</u> install with npm, not yarn, the next websocket extension requires it
5. `dotenv -e .env.local -- npx prisma db push`
6. `npm run dev`
