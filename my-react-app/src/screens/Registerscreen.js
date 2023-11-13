import e from 'cors'
import React , {useState , useEffect} from 'react'
import axios from 'axios'

function Registerscreen() {
    const [name , setname] = useState('')
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const [confirmPassword , setconfirmpassword] = useState('')

    async function Register() {

        if(password == confirmPassword)
        {
            const user = {
                name,email,password,confirmPassword
            }
            try {
                const result = (await axios.post('http://localhost:5000/api/users/register' , user)).data;

            } catch (error) {
                console.log(error);
            }
        }
        else
        {
            alert("password did not match");
        }
    }

  return (
    <div className='row justify-content-center mt-5'>
        <div className='col-md-5 bs'>
            <h3>Register</h3>
            <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => setname(e.target.value)}/>
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setemail(e.target.value)}/>
            <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)}/>
            <input type='text' className='form-control' placeholder='confirm password' value={confirmPassword} onChange={(e) => setconfirmpassword(e.target.value)}/>
            <button className='btn btn-primary mt-3' style={{ backgroundColor: 'black', color: 'white' , boxShadow: 'none'}} onClick={Register}>Register</button>
        </div>
    </div>
  )
}

export default Registerscreen