import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store.ts";
import {openModal} from "../contactsSlice.ts";
import React from "react";
import {deleteContact, fetchContacts} from "../contactsThunk.ts";
import {Link} from "react-router-dom";


const ContactModal: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {modalItem} = useSelector((state: RootState) => state.contacts);

    return (
        <>
            <div className="modal d-block" id="exampleModalCenter" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    {modalItem !== null ?
                        <div className="modal-content">
                        <div className="modal-header border-0 ms-auto">
                            <button className="btn-close" onClick={() => dispatch(openModal(null))}></button>
                        </div>
                        <div className="modal-body d-flex flex-column mx-auto text-center">
                            <img src={modalItem.photo} alt={modalItem.name} style={{width: '250px'}}/>
                            <div className="h3">{modalItem.name}</div>
                            <div className="h4">{modalItem.phone}</div>
                            <div className="h4">{modalItem.email}</div>
                        </div>
                        <div className="modal-footer">
                            <Link to={`/edit/${modalItem.id}`} type="button" className="btn btn-success">Edit</Link>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                dispatch(deleteContact(modalItem.id));
                                dispatch(openModal(null));
                                dispatch(fetchContacts());
                            }}>Delete</button>
                        </div>
                    </div> : <span>Error</span>}
                </div>
            </div>
        </>
    );
};

export default ContactModal;