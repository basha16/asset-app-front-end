import * as yup from 'yup'

export const assetStatus = [
    {
        name: 'Active',
        value: 'active'
    },
    {
        name: 'Returned',
        value: 'returned'
    },
    {
        name: 'Damaged',
        value: 'damaged'
    }]

export type AssignAsset = {
    id?: String
    name: String
    description: String
    quantity: Number
    assignee: string
    status: string
}

export const AssestInitialValues: AssignAsset = {
    name: '',
    description: '',
    quantity: 0,
    assignee: '',
    status: 'draft'
}

export const AssestSchema: any = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    quantity: yup.number().required('Quantity is required'),
    // assignee : yup.string().required('Team is required'),
    status: yup.string().required('Please Select a Status')
})