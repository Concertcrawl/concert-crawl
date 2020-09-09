import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { httpConfig } from '../../utils/http-config'
import { fetchAuth } from '../../store/loginRedux'
import React from 'react'
import { Formik } from 'formik'
import { LogInFormContent } from './LogInFormContent'
import { fetchSavedConcerts } from '../../store/savedConcerts'
import { fetchFavoriteBands } from '../../store/favoriteBands'

export const LogInForm = () => {

  // Declaring dispatch handler.

  const dispatch = useDispatch()

  // Login form frontend validation.

  const validator = Yup.object().shape({
    userEmail: Yup.string()
      .email("Email must be a valid email.")
      .required('Email is required.'),
    userPassword: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least eight characters.")
  });

  // Declaring inital form values.

  const signIn = {
    userEmail: "",
    userPassword: ""
  };

  // Logic to submit user sign in, determines if sign in was successful then sets JWT token to header.

  const submitSignIn = (values, {resetForm, setStatus}) => {
    httpConfig.post("/apis/sign-in/", values)
      .then(reply => {
        let {message, type} = reply;
        setStatus({message, type});
        if (reply.status === 200 && reply.headers["authorization"]) {
          window.localStorage.removeItem("authorization");
          window.localStorage.setItem("authorization", reply.headers["authorization"]);
          resetForm();
          dispatch(fetchAuth())
          dispatch(fetchSavedConcerts())
          dispatch(fetchFavoriteBands())
          // window.location = "/";
        }
        setStatus({message, type});
      });
  };

  return (
    <>
      <Formik
        initialValues={signIn}
        onSubmit={submitSignIn}
        validationSchema={validator}
      >
        {LogInFormContent}
      </Formik>
    </>
  )
}