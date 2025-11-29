import { useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ErrorMessage from './messages/ErrorMessage'
import SuccessMessage from './messages/SuccessMessage'

function LoginForm() {
  const { login, register, logout, user, loading, error } = useAuth()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password.trim()) return false
    if (mode === 'register' && !name.trim()) return false
    return true
  }, [email, password, mode, name])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccess('')

    try {
      if (mode === 'register') {
        await register(name, email, password)
        setSuccess('Cadastro realizado e sessão iniciada!')
      } else {
        await login(email, password)
        setSuccess('Sessão iniciada com sucesso!')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    await logout()
    setSuccess('Sessão encerrada.')
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Acesso seguro</p>
          <h2>{user ? 'Sessão ativa' : 'Entre ou cadastre-se'}</h2>
          <p className="muted">
            Cookies HttpOnly guardam o token JWT após login. Use as mesmas credenciais para buscar e
            inserir dados.
          </p>
        </div>
      </header>

      <form className="stack" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <label className="field">
            <span>Nome completo</span>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        )}
        <label className="field">
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="field">
          <span>Senha</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </label>

        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}

        <div className="form-actions">
          <button className="primary" type="submit" disabled={!canSubmit || loading}>
            {loading ? 'Aguarde…' : mode === 'register' ? 'Cadastrar e entrar' : 'Entrar'}
          </button>
          <div className="cta-inline">
            <button
              className="ghost"
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login' ? 'Quero me cadastrar' : 'Já tenho conta'}
            </button>
            {user && (
              <button className="ghost" type="button" onClick={handleLogout}>
                Sair
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  )
}

export default LoginForm
