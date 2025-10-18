import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (message) => {
    toast.success(
        <div style={{ padding: '8px 16px', fontWeight: 'bold', color: 'black' }}>
            {message}
        </div>,
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        }
    );
};

export const errorToast = (message) => {
    toast.error(
        <div style={{ padding: '8px 16px', fontWeight: 'bold', color: 'black' }}>
            {message}
        </div>,
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        }
    );
};

export const infoToast = (message) => {
    toast.info(
        <div style={{ padding: '8px 16px', fontWeight: 'bold', color: 'black' }}>
            {message}
        </div>,
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        }
    );
};