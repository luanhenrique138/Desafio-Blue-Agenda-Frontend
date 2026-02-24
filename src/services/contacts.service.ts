import type { Contact, CreateContactRequest, UpdateContactRequest } from '@/types/contacts';
import { http } from './http';

export const ContactService = {
    async getAllContacts(): Promise<Contact[]> {
        const { data } = await http.get<Contact[]>('/api/Contacts')
        return data;
    },

    async getContactById(id: string): Promise<Contact> {
        const { data } = await http.get<Contact>(`/api/Contacts/${id}`)
        return data;
    },

    async createContact(payload: CreateContactRequest): Promise<Contact> {
        const { data } = await http.post<Contact>('/api/Contacts', payload);
        return data;
    },

    async updateContact(id: string, payload: UpdateContactRequest): Promise<Contact> {
        const { data } = await http.put<Contact>(`/api/Contacts/${id}`, payload);
        return data
    },

    async deleteContact(id: string): Promise<void> {
        await http.delete<Contact>(`/api/Contacts/${id}`);
    }

    
}