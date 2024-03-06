


import * as yup from 'yup'

export type UserLogin = {
    email:String 
    password:String
}

export const LoginInitialValues : UserLogin ={
    email:'',
    password:''
}

export const LoginSchema:any = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Please select a position')
})