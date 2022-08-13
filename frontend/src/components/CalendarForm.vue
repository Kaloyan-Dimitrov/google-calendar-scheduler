<template>
  <div class="simple-example">
    <vue-meeting-selector
      v-model="meeting"
      :date="date"
      :loading="loading"
      :class-names="classNames"
      :meetings-days="meetingsDays"
      ref="meetingSelector"
      @next-date="nextPage"
      @previous-date="prevPage"
    >
      <template #header="{ meetings }">
        <div class="text-primary text-h6">{{ getLocalDateString(meetings.date) }}</div>
        <div class="text-primary text">{{ getLocalWeekdayString(meetings.date) }}</div>
      </template>

      <template
        #meeting="{ meeting }">
        <q-btn flat class="q-ma-sm" :color="isMeetingSelected(meeting) ? 'accent' : 'black'" >
          <div
            v-if="meeting.date"
            class="meeting "
            @click="selectMeeting(meeting)">
            {{ formatTime(meeting.date) }}
          </div>
          <div v-else class="meeting--empty">
            &mdash;
          </div>
        </q-btn>
      </template>

      <template #button-previous>
        <q-btn :disabled="prevDisabled" flat round color="primary" icon="fa-solid fa-angle-left" @click="prevPage" />
      </template>
      <template #button-next>
        <q-btn :disabled="nextDisabled" flat round color="primary" icon="fa-solid fa-angle-right" @click="nextPage" />
      </template>
      <template #button-up="{ isDisabled }">
        <q-btn :disabled="isDisabled" flat round color="primary" icon="fa-solid fa-angle-up" @click="up"/>
      </template>
      <template #button-down="{ isDisabled }">
        <q-btn :disabled="isDisabled" flat round color="primary" icon="fa-solid fa-angle-down" @click="down"/>
      </template>
    </vue-meeting-selector>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import VueMeetingSelector from 'vue-meeting-selector';
import { getAllEvents } from '../services/EventsService';
import slotsGenerator from '../services/SlotsService';
import useAppointmentStore from '../stores/appointment.store';

const meetingSelector = ref(null);

const store = useAppointmentStore();

const date = ref(new Date());
const meetingsDays = ref([]);
const allMeetingsDays = ref([]);
const meeting = ref(null);
const loading = ref(true);
const nbDaysToDisplay = ref(5);
const allEvents = ref(undefined);
const currentPage = ref(0);

const classNames = {
	tabLoading: 'loading-div',
	tabMeetingButton: 'bg-positive'
};
const nextDisabled = computed(() => {
	return (currentPage.value + 1) * nbDaysToDisplay.value >= allMeetingsDays.value.length;
});
const prevDisabled = computed(() => {
	return currentPage.value == 0;
});

function formatTime(d) {
	return d.toLocaleTimeString(window.navigator.language, {hour: 'numeric', minute: 'numeric'});
}
function isMeetingSelected(met) {
	if (!meeting.value) return false;
	const selectedDate = new Date(met.date);
	const previousDate = new Date(meeting.value.date);
	return selectedDate.getTime() == previousDate.getTime();
}
// @click on meeting
function selectMeeting(met) {
	if (meeting.value) {
		const selectedDate = new Date(met.date);
		const previousDate = new Date(meeting.value.date);
		if (selectedDate.getTime() !== previousDate.getTime()) {
			meeting.value = met;
			store.setAppointmentTime(meeting.value.date);
		} else {
			meeting.value = null;
			store.setAppointmentTime(null);
		}
	} else {
		meeting.value = met;
		store.setAppointmentTime(meeting.value.date);
	}
}
function getLocalWeekdayString(d) {
	const weekday = d.toLocaleDateString(window.navigator.language, { weekday: 'long' });
	let result = weekday[0].toUpperCase() + weekday.slice(1);
	return result;
}
function getLocalDateString(d) {
	return d.toLocaleDateString(window.navigator.language, { month: 'long', day: 'numeric' });
}
function nextPage() {
	loading.value = true;
	currentPage.value++;
	const startIndex = currentPage.value * nbDaysToDisplay.value;
	meetingsDays.value = allMeetingsDays.value.slice(startIndex, startIndex + nbDaysToDisplay.value);
	loading.value = false;
}
function prevPage() {
	loading.value = true;
	if (currentPage.value > 0) {
		currentPage.value--;
		const startIndex = currentPage.value * nbDaysToDisplay.value;
		meetingsDays.value = allMeetingsDays.value.slice(startIndex, startIndex + nbDaysToDisplay.value);
	}
	loading.value = false;
}
function up() {
	meetingSelector.value.previousMeetings();
}
function down() {
	meetingSelector.value.nextMeetings();
}

onMounted(async () => {
	let all = await getAllEvents();
	allEvents.value = all;

	allMeetingsDays.value = slotsGenerator(all);
	meetingsDays.value = allMeetingsDays.value.slice(0, nbDaysToDisplay.value);
	loading.value = false;
});

</script>