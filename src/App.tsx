import './App.css';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import RegisterContsct from "./containers/RegisterContact/RegisterContsct.tsx";
import Contacts from "./features/contacts/Contacts.tsx";

const App = () => (
    <>
        <header className="container">
            <div className="d-flex justify-content-between align-items-center pt-3">
                <NavLink to="/" className="h3 m-0 text-decoration-none">Contacts</NavLink>
                <Link to="/new-contact" className="btn btn-outline-primary">Add new contact</Link>
            </div>
            <hr/>
        </header>
        <main className="container">
            <Routes>
                <Route path="/" element={<Contacts/>}/>
                <Route path="/new-contact" element={<RegisterContsct/>}/>
                <Route path="/edit/:id" element={<RegisterContsct/>}/>
                <Route path="*" element={<h1 className="text-center">Error 404</h1>}/>
            </Routes>
        </main>
    </>
);

export default App;
