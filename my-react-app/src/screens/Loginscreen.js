import e from 'cors'
import React , {useState , useEffect} from 'react'


function Loginscreen() {
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')

    function Login() {
            const user = {
                email,password
            }
            console.log(user);
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