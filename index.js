import express from 'express';
import cors from 'cors';
import {
	setEvent,
	getAvailableEvents
} from './calendar.js';

const app = express();
const port = 3000;

app.use(cors({
	origin: true
}));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/all-events', async (req, res) => {
	let events = await getAvailableEvents();
	res.send(JSON.stringify(events));
});

app.post('/save-event', async (req, res) => {
	const summary = `${req.body.name} - ${req.body.phoneNumber} - ${req.body.email}`;
	const date = req.body.dateAndTime;
	await setEvent(summary, date);
	res.status(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));