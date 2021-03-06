import React, { useEffect, useState } from 'react'
import LoginRegisterBox from '../components/LoginRegisterBox'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { setError } from '../store/actions/userActions'
import { Redirect } from 'react-router-dom'

function Register() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const error = useSelector(state => state.app.error)
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: 'error',
        title: error
      })
      dispatch(setError(null))
    }
  }, [error])

  if (isLoggedIn) {
    Toast.fire({
      icon: 'success',
      title: 'Successfully registered'
    })
    return <Redirect to="/home" />
  }
  return (
    <div className="flex h-screen items-center justify-center bg-green-100">
      <LoginRegisterBox type="register"/>
    </div>
  )
}

export default Register