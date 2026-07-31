import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get('code')
    const email = searchParams.get('email')

    if (!code || !email) {
      navigate('/login', { replace: true })
      return
    }

    fetch(`/auth/login-with-code/${encodeURIComponent(code)}/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async response => {
        if (!response.ok) throw new Error(await response.text())
        return response.json()
      })
      .then(data => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('userId', data.id)
        navigate('/', { replace: true })
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
  }, [navigate, searchParams])

  return <div>Kirjaudutaan sisään...</div>
}

export default AuthCallback