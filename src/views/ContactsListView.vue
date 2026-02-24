<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ContactsService } from "@/services/contacts.service";
import type { Contact } from "@/types/contacts";

const contacts = ref<Contact[]>([])
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    contacts.value = await ContactsService.getAllContacts()
  } catch (e: any) {
    error.value = e?.message ?? "Erro ao buscar contatos"
  }
})
</script>

<template>
  <div style="padding: 16px">
    <h1>Contatos</h1>

    <p v-if="error">{{ error }}</p>

    <ul v-else>
      <li v-for="c in contacts" :key="c.id">
        {{ c.name }} - {{ c.email }} - {{ c.phone }}
      </li>
    </ul>
  </div>
</template>