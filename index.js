// index.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { status } = require('minecraft-server-util');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

client.on('message', async msg => {
    if (msg.body.toLowerCase() === '!status') {
        const host = 'premium-1.sapphire-cloud.org'; // Ganti dengan IP/domain server kamu
        const port = 25733; // Ganti kalau pakai port custom

        try {
            const result = await status(host, port);
            const playersOnline = result.players.online;
            msg.reply(`🟢 Server is ONLINE\n👥 ${playersOnline} players online`);
        } catch (error) {
            msg.reply('🔴 Server is OFFLINE or unreachable');
        }
    }
});

client.initialize();
