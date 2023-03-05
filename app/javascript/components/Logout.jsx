import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      navigate('/login')
    } else destroyUser()
  }, [])

  const destroyUser = async () => {
    await axios
      .post('http://localhost:3000/users/tokens/revoke', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        localStorage.setItem('isLoggedIn', false)
        navigate('/login?error=User Successfully Logged out')
      })
      .catch(function (error) {})
  }
}
