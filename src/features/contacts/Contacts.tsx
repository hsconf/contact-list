import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {fetchContacts} from './contactsThunk';
import ContactModal from "./components/ContactModal.tsx";
import {openModal} from "./contactsSlice.ts";

const Contacts: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const allContacts = useSelector((state: RootState) => state.contacts.items);
    const modal = useSelector((state: RootState) => state.contacts.isOpen);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className="d-flex flex-column">
            {allContacts.map((contact) => (
                <div className="card w-50 mb-2" key={Math.random()} onClick={() => dispatch(openModal(contact))}>
                    <div className="d-flex align-items-center">
                        <img style={{ width: '150px' }} src={contact.photo} alt={contact.name} />
                        <span className="ms-4 fw-bold" style={{ fontSize: '30px' }}>{contact.name}</span>
                    </div>
                </div>
            ))}
            {modal ? <ContactModal /> : null}
        </div>
    );
};

export default Contacts;
