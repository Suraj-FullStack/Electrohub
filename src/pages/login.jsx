import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../services/authApi'
import { setUser } from '../features/authSlice'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [login, { isLoading }] = useLoginMutation()
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const onSubmit = async (formData) => {
    setLoginError('')
    try {
      const result = await login(formData).unwrap()
      // DummyJSON returns { id, username, email, firstName, lastName,
      // gender, image, accessToken, refreshToken } — store the whole
      // thing so refresh/logout has what it needs.
      dispatch(setUser(result))
      // Send them back to whatever page RouteProtection redirected them
      // from, or home if they came here directly.
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setLoginError(err?.data?.message || 'Login failed. Check your credentials.')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Account</p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Sign in</h1>
      <p className="mt-2 font-mono text-xs text-muted">
        Demo catalog, demo login — try <code className="text-ink">emilys</code> /{' '}
        <code className="text-ink">emilyspass</code>.
      </p>

      {loginError && (
        <p className="mt-4 rounded border border-signal/30 bg-signal/10 px-3 py-2 font-mono text-xs text-signal-dark">
          {loginError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            Username
          </label>
          <input
            {...register('username', { required: 'Username is required' })}
            type="text"
            id="username"
            className="w-full rounded border border-line bg-panel p-2.5 text-sm text-ink outline-none transition focus:border-ink"
            placeholder="emilys"
          />
          {errors.username && (
            <p className="mt-1 font-mono text-xs text-signal-dark">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            Password
          </label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            id="password"
            className="w-full rounded border border-line bg-panel p-2.5 text-sm text-ink outline-none transition focus:border-ink"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 font-mono text-xs text-signal-dark">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-ink px-5 py-2.5 font-mono text-sm text-paper transition hover:bg-ink-soft disabled:opacity-50"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default Login
