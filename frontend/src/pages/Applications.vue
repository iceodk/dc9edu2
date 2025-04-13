<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="applications"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Applications',
  setup() {
    const applications = ref([]);
    const search = ref('');
    const headers = [
      { key: 'Title', title: 'Navn' },
      { key: 'Intern_x0020_status', title: 'Status' },
      { key: 'Uddannelse', title: 'Uddannelse' },
      { key: 'CPR_x0020_med_x0020_bindestreg', title: 'CPR' },
      { key: 'Ekstern_x0020_status', title: 'Status IT-Reg' },
      { key: 'Startdato', title: 'Ønsket startdato' },
    ];


    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:3000/api/optag/applications');
        applications.value = await response.json();
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      }
    });

    return { applications, search, headers };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
