import Discord, { TextChannel } from 'discord.js';
import { panic, formatMessage } from '../helpers';

/**
 *
 */
export function sendWelcomeMessage(
	guild: Discord.Guild,
	member: Discord.GuildMember | Discord.PartialGuildMember | null,
	channel: Discord.TextChannel | string,
) {
	const welcomeChannel =
		channel instanceof Discord.TextChannel
			? channel
			: (guild.channels.cache.find((ch) => ch.name === channel) as TextChannel | undefined);

	if (!welcomeChannel) return;

	welcomeChannel.send(formatMessage(guild)`
Welcome to the Olin Class of 2024 Discord${member ? `, ${member}` : ''}!

This Discord serves as a place for the Olin Class of 2024, a few gappies in the Class of 2025, and some current students, to hang out, have fun, and get to know each other.

Feel free to talk about whatever here in ${'#general'}, post a picture of your pet in ${'#pet-pics'}, or talk about The Happenings in ${'#current-events'}.

Make sure to share your Instagram/Snapchat/whatever in ${'#social-media'}.

Most evenings from 10PM-2AM ET, we hang out and play games on Zoom. Find more info and the link in ${'zoom'} (and/or use the \`!zoominfo\` command). You can see if anyone is on Zoom right now with the \`!zoom\` command or by looking at my (${`@Hanbot`}'s) Discord status.

Finally, please assign yourself roles (class, time zone, city, major, pronouns, etc.) by clicking on your name.

Wondering why everyone is named Han? Well, we have a cult. Ask our glorious leader, Han, for more details and for how to join!
`);
}

export default function welcomeCommand(args: string, message: Discord.Message) {
	if (!message.guild) return 'Sorry! This command must be run from within a server!';
	const target = message.mentions.members?.first() || message.member;
	sendWelcomeMessage(message.guild, target, message.channel as TextChannel);
}
