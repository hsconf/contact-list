import {useEffect, useState} from "react";
import {ApiContact} from "../../types.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {createContact, editContact, fetchContacts} from "../../features/contacts/contactsThunk.ts";
import {Link, useNavigate, useParams} from "react-router-dom";

const RegisterContsct = () => {

    const [contact, setContact] = useState<ApiContact>({
        name: '',
        phone: '',
        email: '',
        photo: '',
    });
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {inCreating, items} = useSelector((state: RootState) => state.contacts);
    const {id} = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            await dispatch(editContact({contact, id}));
            dispatch(fetchContacts());
        } else {
            await dispatch(createContact(contact));
        }
        navigate('/');
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchContacts());
            if (items.length !== 0) {
                const edit = items.find((contact) => contact.id === id);
                if (edit) {
                    setContact({
                        name: edit.name,
                        phone: edit.phone,
                        email: edit.email,
                        photo: edit.photo,
                    });
                }
            }
        }
    }, [dispatch]);

    return (
        <>
            {id ? <h3>Edit contact</h3> : <h3>New contact</h3>}
            <div className="row">
                <form onSubmit={onSubmit} className="col-6 d-flex flex-column mx-auto gap-3 border border-3 rounded-5 px-5 py-5">
                    <input type="text" name="name" placeholder="Name" className="form-control" onChange={handleChange} value={contact.name} required/>
                    <input type="number" name="phone" placeholder="Phone" className="form-control" onChange={handleChange} value={contact.phone} required/>
                    <input type="text" name="email" placeholder="Email" className="form-control" onChange={handleChange} value={contact.email} required/>
                    <input type="text" name="photo" placeholder="Photo" className="form-control" onChange={handleChange} value={contact.photo} required/>
                    {
                        contact.photo ? <img style={{width: '200px', margin: '0 auto'}} src={contact.photo} alt="Previev"/> : null
                    }
                    <div className="d-flex justify-content-evenly gap-2 mt-auto">
                        <button type="submit" className="btn btn-outline-success w-100" disabled={inCreating}>Save</button>
                        <Link to="/" type="submit" className="btn btn-outline-warning w-100">Back to contacts</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterContsct;