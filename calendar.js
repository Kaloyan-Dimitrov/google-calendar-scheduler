import {
	google
} from 'googleapis';
import auth from './authorization.js';

const calendar = google.calendar({
	version: 'v3',
	auth
});
const calendarId = await getCalendarIdByName('Online');

async function getCalendarIdByName(name) {
	const res = await calendar.calendarList.list().catch(console.error);
	const calendars = res.data.items;
	const result = calendars.find(c => c.summary == name);
	return result.id;
}

export async function getAvailableEvents() {
	let start = new Date();
	let end = new Date();
	end.setDate(end.getDate() + 30);
	const res = await calendar.events.list({
		calendarId,
		timeMin: start.toISOString(),
		timeMax: end.toISOString(),
		singleEvents: true,
		orderBy: 'startTime',
	}).catch(console.error);
	const events = res.data.items;
	let eventsRes;
	if (events.length)
		eventsRes = events.map(event => {
			return {
				start: event.start,
				end: event.end,
				summary: event.summary
			};
		}).filter(e => e.summary == undefined);
	else console.log('No upcoming events found.');
	return eventsRes;
}

export async function setEvent(summary, date) {
	let events = await getAvailableEvents();
	let event = events.find(e => (new Date(e.start.dateTime)).getTime() == (new Date(date)).getTime());
	event.summary = summary;
	await calendar.events.patch({
		calendarId,
		eventId: event.id,
		resource: event
	}).catch(console.error);
}