<script setup>
import CalendarForm from '@/components/CalendarForm.vue';
import DetailsForm from '../components/DetailsForm.vue';
</script>

<template>
  <q-page class="full-width row wrap justify-center items-center content-center">
    <q-header reveal bordered class="text-white bg-transparent text-h4">
      <q-toolbar>
        <q-avatar size="2em">
          <img src="../assets/logo.png"/>
        </q-avatar>
        <q-toolbar-title class="text-h4">
          Запазване на час за преглед
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <CalendarForm class="col-7"/>
    <DetailsForm class="col-7"></DetailsForm>
  </q-page>
</template>

