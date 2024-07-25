
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiContact, ApiContacts, Contact} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../store.ts";

export const createContact = createAsyncThunk<void, ApiContact, {state: RootState}>('contacts/create',  async (apiContact) => {
await axiosApi.post('/contacts.json', apiContact);
});

export const fetchContacts = createAsyncThunk<Contact[], void, {state: RootState }>('contacts/fetch',async () => {
    const {data: contacts} = await axiosApi.get<null | ApiContacts>('/contacts.json');
    if (contacts === null) {
        return [];
    }

    return Object.keys(contacts).map<Contact | null >((id) => ({
        ...contacts[id], id
    }));
});

interface EditContactPayload {
    id: string;
    contact: ApiContact;
}
export const editContact = createAsyncThunk<Contact, EditContactPayload, { state: RootState }>(
    'contacts/edit',
    async ({ id, contact }) => {
        await axiosApi.put(`/contacts/${id}.json`, contact);
        return { ...contact, id };
    }
);

export const deleteContact = createAsyncThunk<void, string, {state: RootState}>('contacts/delete',async (id: string) => {
    await axiosApi.delete(`contacts/${id}.json`);
});