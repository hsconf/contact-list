import {Contact} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createContact, deleteContact, editContact, fetchContacts} from "./contactsThunk.ts";

export interface ContactsState {
    items: Contact[];
    isFetching: boolean;
    inCreating: boolean;
    isLoading: boolean;
    isOpen: boolean;
    modalItem: Contact | null;
}

const initialState: ContactsState = {
    items: [],
    isFetching: false,
    inCreating: false,
    isLoading: false,
    isOpen: false,
    modalItem: null,
};

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = !state.isOpen;
            if (action.payload !== null) {
                state.modalItem = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createContact.pending, (state) => {
           state.inCreating = true;
           state.isLoading = true;
        }).addCase(createContact.fulfilled, (state) => {
            state.inCreating = false;
            state.isLoading = false;
        }).addCase(createContact.rejected, (state) => {
            state.inCreating = false;
            state.isLoading = false;
        }).addCase(fetchContacts.pending, (state) => {
            state.isLoading = true;
            state.isFetching = true;
        }).addCase(fetchContacts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isFetching = false;
            state.items = payload;
        }).addCase(fetchContacts.rejected, (state) => {
            state.isLoading = false;
            state.isFetching = false;
        }).addCase(deleteContact.fulfilled, (state, {meta}) => {
            state.items = state.items.filter(contact => contact.id !== meta.arg);
        }).addCase(editContact.fulfilled, (state, {payload}) => {
            console.log(payload);
            console.log(state.items.map(item =>
                item.id === payload.id ? payload : item
            ));
        });
    }
});

export const {openModal} = contactsSlice.actions;
export const ContactsReducer = contactsSlice.reducer;