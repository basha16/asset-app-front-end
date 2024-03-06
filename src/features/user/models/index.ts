


import * as yup from 'yup'
import userService from '../../../services/userServices/UserServices'

export const positions = [
    {
        name: 'Admin',
        value: 'admin'
    },
    {
        name: 'HR',
        value: 'hr'
    },
    {
        name: 'Normal User',
        value: 'normal'
    }]

export type User = {
    id?: String
    firstName: String
    lastName: String
    email: String
    password: String
    position: String
    team: string
}

export const UserInitialValues: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: 'hr',
    team: ''
}

export const UserSchema: any = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is required')
        .test('unique-email', 'Email already exists', async function (value, ctx) {
            if (!value) {
                return true;
            }
            const { parent: { id } } = ctx
            const { path, createError }: any = this
            try {
                if (!id) {
                    const { isExists } = await userService.checkUserIsExists(value);
                    if (isExists) {
                        return createError({
                            path,
                            message: 'Email Already Exists',
                        });
                    }
                } else {
                    return true
                }
            } catch (error) {
                console.error('Error checking email uniqueness:', error);
            }

            return true;
        }),
    position: yup.string().required('Please select a position'),
    password: yup.string().required('Enter a password'),
    team: yup.string().required('Team is required')
})