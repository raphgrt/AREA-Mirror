import { useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useAppDispatch } from '../store/hooks'
import { loginSuccess } from '../store/slices/authSlice'
import { setWorkflows } from '../store/slices/workflowsSlice'
import { MOCK_USER } from '../mocks/user'
import { MOCK_WORKFLOWS } from '../mocks/workflows'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Initialize store with mock data
    dispatch(loginSuccess(MOCK_USER))
    dispatch(setWorkflows(MOCK_WORKFLOWS))
  }, [dispatch])

  return (
    <>
      <Outlet />
    </>
  )
}