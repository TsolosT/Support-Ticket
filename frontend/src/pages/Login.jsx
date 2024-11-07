import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  { user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);

    useEffect(() => {
        // Check for error
        if (isError) {
            toast.error(message);
        }
        // Redirect when logged in
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [isError, isSuccess, user, message, dispatch, navigate]);


    //On input change
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    //On form Submit 
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner/>
    }
    
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" value={email} name='email' onChange={onChange} placeholder='Enter your email..' required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" value={password} name='password' onChange={onChange} placeholder='Enter a password..' required/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit  
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login