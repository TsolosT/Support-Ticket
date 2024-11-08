import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
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

    const  { isLoading } = useSelector(state => state.auth);

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
        dispatch(login(userData))
            .unwrap()
            .then((user) => {
                toast.success(`Welcome again ${user.name}`);
                navigate('/');
            })
            .catch(toast.error);
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
                            Sign in  
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;