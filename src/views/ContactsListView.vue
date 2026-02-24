<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ContactsService } from "@/services/contacts.service";
import type { Contact } from "@/types/contacts";




const contacts = ref<Contact[]>([])

const deleteDialog = ref(false)
const error = ref<string | null>(null)
const deleting = ref(false)
const selectContact = ref<Contact | null>(null);

async function loadContacts() {
  contacts.value = await ContactsService.getAllContacts()
}

function openDeleteDialog(contact: Contact){
    selectContact.value = contact
    deleteDialog.value = true
}

function closeDeleteDialog(){
    deleteDialog.value = false
    selectContact.value = null
}


async function onDelete(contact: Contact) {
    await ContactsService.deleteContact(contact.id)
    loadContacts()
}


async function confirmDelete() {
    if(!selectContact.value) return;

    try {
        deleting.value = true
        await onDelete(selectContact.value)

        closeDeleteDialog()
        
    } finally {
        deleting.value = false
    }
}

async function onEdit(contact: Contact) {
    console.log("")
}

onMounted(loadContacts)

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        Contatos
      </v-card-title>

      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in contacts" :key="c.id">
                <td>{{ c.name }}</td>
                <td>{{ c.email }}</td>
                <td>{{ c.phone }}</td>
                <td class="text-right">
                <v-tooltip text="Editar" location="top">
                    <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        icon="mdi-pencil"
                        variant="text"
                        @click="onEdit(c)"
                    />
                    </template>
                </v-tooltip>

                <v-tooltip text="Excluir" location="top">
                    <template #activator="{ props }">
                    <v-btn
                        v-bind="props"
                        icon="mdi-delete"
                        variant="text"
                        @click="openDeleteDialog(c)"
                    />
                    </template>
                </v-tooltip>
                </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    
    <v-dialog v-model="deleteDialog" max-width="480">
        <v-card>
            <v-card-title>Confirmar exclusão</v-card-title>

            <v-card-text>
                Tem certeza que deseja excluir o contato
                <strong>{{ selectContact?.name }}</strong>?
                <div class="text-caption text-medium-emphasis mt-2">
                    Essa ação não pode ser desfeita.
                </div>

                <v-alert
                    v-if="error"
                    type="error"
                    variant="tonal"
                    class="mt-3"
                    :text="error"
                />
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn variant="text" @click="closeDeleteDialog" :disabled="deleting">
                    Cancelar
                </v-btn>
                <v-btn color="red" @click="confirmDelete" :loading="deleting">
                    Excluir
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
  </v-container>
</template>


