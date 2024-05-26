import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {CurrUserProvider} from "./context/CurrUserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CurrUserProvider>
            <App />
        </CurrUserProvider>
    </BrowserRouter>,
);
