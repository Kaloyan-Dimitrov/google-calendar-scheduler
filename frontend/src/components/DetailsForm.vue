<template>
    <div class="q-pa-md">

        <q-form
        :disable="isDisabled"
        @submit="onSubmit"
        class="q-gutter-md"
        >
            <q-input
            :disable="isDisabled"
            v-model="store.name"
            label="Вашето име *"
            hint="Име, презиме и фамилия"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Моля попълнете това поле']"
            />

            <q-input
            :disable="isDisabled"
            type="tel"
            v-model="store.phoneNumber"
            label="Вашият телефонен номер *"
            lazy-rules
            :rules="[ val => val && val.length > 8 || 'Моля проверете дали сте въвели правилно телефонния си номер']"
            />

            <q-input
            :disable="isDisabled"
            type="email"
            v-model="store.email"
            label="Вашият имейл *"
            lazy-rules
            :rules="[ val => val && validateEmail(val) || 'Моля проверете дали сте въвели правилно имейла си']"
            />

            <div>
                <q-btn :disabled="isDisabled" label="Запазване" type="submit" class="bg-primary text-dark"/>
            </div>
            <q-tooltip anchor="top middle" :class="`text-body1 bg-primary text-dark ${isDisabled ? '': 'invisible'}`">
                Първо изберете часа, който желаете за прегледа
            </q-tooltip>
        </q-form>

    </div>
</template>

<script setup>
import { computed } from 'vue';
import useAppointmentStore from '../stores/appointment.store';

const store = useAppointmentStore();

const isDisabled = computed(() => store.dateAndTime == null);

const validateEmail = (value) => {
	return String(value)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

function onSubmit() {
	store.saveAppointment();
}
</script>

<style>

</style>