import e from 'cors'
import React , {useState , useEffect} from 'react'
import axios from 'axios'

 function Loginscreen() {
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')

    async function Login() {
            const user = {
                email,password
            }
            try {
              const result = (await axios.post('http://localhost:5000/api/users/login' , user)).data;

          } catch (error) {
              console.log(error);
          }
    }

  return (
    <div className='row justify-content-center mt-5'>
        <div className='col-md-5 bs'>
            <h3>Login</h3>
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setemail(e.target.value)}/>
            <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)}/>
            <button className='btn btn-primary mt-3' style={{ backgroundColor: 'black', color: 'white' , boxShadow: 'none'}} onClick={Login}>Login</button>
        </div>
    </div>
  )
}

export default Loginscreen