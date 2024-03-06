


import * as yup from 'yup'
import userService from '../../../services/userServices/UserServices'


export type UserRegister = {
    firstName: String
    lastName: String
    email: String
    password: String
    confirmPassword: string
}

export const UserRegisterInitialValues: UserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const UserRegisterSchema: any = yup.object().shape({
    firstName: yup.string().required('Name is required'),
    lastName: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required')
        .test('unique-email', 'Email already exists', async function (value) {
            if (!value) {
                return true;
            }
            const { path, createError }: any = this
            try {
                const {isExists} = await userService.checkUserIsExists(value);
                if (isExists) {
                    return createError({
                        path,
                        message: 'Email Already Exists',
                    });
                }
            } catch (error) {
                console.error('Error checking email uniqueness:', error);
            }

            return true;
        }),
    password: yup.string().required('Please select a position'),
    confirmPassword: yup.string().required('Team is required')
})