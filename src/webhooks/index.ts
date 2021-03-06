import express from 'express';
import makeZoomWebhookHandler from './zoom';
import { Client } from 'discord.js';
import { getDebugInfo } from '../commands/debugInfo';

export default function createApp(discord: Client) {
	const app = express();

	app.use(express.json());

	app.post('/webhooks/zoom', makeZoomWebhookHandler(discord));
	app.get('*', async (req, res) => {
		try {
			res.status(200);
			res.write(await getDebugInfo());
			res.end();
		} catch (err) {
			console.error(`ERROR(app.get(*))!`);
			console.error(req);
			console.error(err.message);
			err.stack && console.error(err.stack);
			res.status(500);
			res.write('Error, please check logs.');
			res.end();
		}
	});

	return app;
}
