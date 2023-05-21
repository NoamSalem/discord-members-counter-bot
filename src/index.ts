import { config } from 'dotenv';
import { Client, GatewayIntentBits, ChannelType, PermissionsBitField } from 'discord.js';

config();
const token = process.env.CLIENT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async member => {
    const guildId = member.guild.id;
    const guild = member.guild;
    const memberCount = guild.memberCount;
    const channels = guild.channels;
    const name = `『👪』Members ${memberCount}`;

    await channels.create({
        type: ChannelType.GuildVoice,
        position: 0,
        permissionOverwrites: [
            {
                id: guild.roles.everyone,
                deny: [PermissionsBitField.Flags.ReadMessageHistory]
            },
        ],
        name
    });
});

//make sure this line is the last line
client.login(token); //login bot using token