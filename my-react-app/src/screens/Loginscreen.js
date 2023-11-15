import e from 'cors'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';


 function Loginscreen() {
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    async function Login() {
            const user = {
                email,password
            }
            try {
              setLoading(true);
              const result = (await axios.post('http://localhost:5000/api/users/login' , user)).data;
              setLoading(false);

              localStorage.setItem('currentUser' , JSON.stringify(result));
              window.location.href = '/home';
          } catch (error) {
            setLoading(false);
            setError(true);
          }
    }

  return (
    <div>
      {loading && (<Loader/>)}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 bs'>
            {error ? <Error message='Invalid Credentials' /> : null}
            <h3>Login</h3>
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setemail(e.target.value)}/>
            <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)}/>
            <button className='btn btn-primary mt-3' style={{ backgroundColor: 'black', color: 'white' , boxShadow: 'none'}} onClick={Login}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Loginscreen