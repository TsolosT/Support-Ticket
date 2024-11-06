import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2} = formData;
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

        //Verify Password Confirm
        if (password !== password2) {
            toast.error('Passwords do not match');
        }
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser/> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" value={name} name='name' onChange={onChange} placeholder='Enter your name..' required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" value={email} name='email' onChange={onChange} placeholder='Enter your email..' required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" value={password} name='password' onChange={onChange} placeholder='Enter a password..' required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password2" value={password2} name='password2' onChange={onChange} placeholder='Confirm your password..' required/>
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

export default Register