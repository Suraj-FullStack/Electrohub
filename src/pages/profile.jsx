import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../features/authSlice'

const Profile = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Account</p>

      <div className="mt-4 flex items-center gap-4">
        {user?.image && (
          <img
            src={user.image}
            alt={user.username}
            className="h-16 w-16 rounded-full border border-line object-cover"
          />
        )}
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">
            {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
          </h1>
          <p className="font-mono text-xs text-muted">@{user?.username}</p>
        </div>
      </div>

      {user?.email && (
        <p className="mt-6 border-t border-line pt-4 text-sm text-ink/70">
          <span className="font-mono text-xs uppercase tracking-wide text-muted">Email </span>
          {user.email}
        </p>
      )}

      <button
        type="button"
        onClick={handleLogout}
        className="mt-8 w-full rounded border border-line px-4 py-2.5 font-mono text-sm text-ink transition hover:border-ink"
      >
        Log out
      </button>
    </div>
  )
}

export default Profile
