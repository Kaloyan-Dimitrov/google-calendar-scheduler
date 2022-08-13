function getBaseDate(date) {
	const tz = -date.getTimezoneOffset();
	const time = {
		hours: Math.floor(tz / 60),
		minutes: tz % 60,
	};
	const d = new Date(date);
	d.setHours(time.hours);
	d.setMinutes(time.minutes);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return d;
}

function generateDaysFromEvents(events) {
	let days = [],
		currentIndexDay = 0;
	const startDate = new Date(events[0].start.dateTime);
	days[currentIndexDay] = {
		date: getBaseDate(startDate),
		slots: []
	};
	for (let i = 0; i < events.length; i++) {
		const event = events[i];
		const eventStart = new Date(event.start.dateTime);
		if (days[currentIndexDay].date.getDate() != eventStart.getDate()) {
			currentIndexDay++;
			days[currentIndexDay] = {
				date: getBaseDate(eventStart),
				slots: []
			};
		}
		days[currentIndexDay].slots.push({
			date: eventStart
		});
	}
	return days;
}

export default generateDaysFromEvents;