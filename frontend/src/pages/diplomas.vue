<template>
    <div>
    <VCard title="Create Awesome 🙌">
      <VCardText>
        <v-container>
          <v-data-table
  :headers="visibleHeaders"
  :items="applications"
  :search="search"
  :loading="loading"
  class="elevation-1"
  show-expand
  item-value="id"
  :expanded="expanded"
>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Diplomas Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:[`item.Dimissionsdato`]="{ item }">
        {{ new Date(item.Dimissionsdato).toLocaleDateString() }}

      </template>

      <template v-slot:expanded-item="{ item }">
  <tr>
    <td :colspan="visibleHeaders.length">
      <div class="px-4 py-2">
        <strong>Extra Info:</strong> {{ item.Navn }} ({{ item.Studienummer }})
        <p>More detailed content can go here, like related data, actions, etc.</p>
      </div>
    </td>
  </tr>
</template>

      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>




    </v-data-table>
  </v-container>
      </VCardText>
    </VCard>
  </div>
  

</template>

<script>
import { ref, onMounted } from 'vue';
import { computed } from 'vue';

export default {
  name: 'Applications',
  setup() {
    const applications = ref([]);
    const search = ref('');
    const loading = ref(false);
    const headers = [
    { key: 'id', title: 'ID', hidden: true },
      { key: 'Title', title: 'Cpr' },
      { key: 'Navn', title: 'Navn' },
      { key: 'Studienummer', title: 'sn' },
      { key: 'Forlob', title: 'Forløb' },
      { key: 'Dimissionsdato', title: 'Dimissionsdato' },
      { key: 'Udannelsespfix', title: 'Udannelse' },
    ];


    const visibleHeaders = computed(() =>
  headers.filter(header => !header.hidden)
)
const expanded = ref([]);

    onMounted(async () => {
      loading.value = true;
      try {
        const response = await fetch('http://localhost:3000/api/diplomas');
        applications.value = await response.json();
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        loading.value = false;
      }
    });

    return { applications, search, headers, visibleHeaders, loading };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
