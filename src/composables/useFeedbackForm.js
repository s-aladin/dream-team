import { reactive, readonly } from 'vue'

const initialState = {
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: '',
    grade: '',
    rating: 0,
    quickReplies: []
}

const state = reactive({ ...initialState })

export function useFeedbackForm() {
    const updateFormData = (newData) => {
        Object.assign(state, newData)
    }

    const resetForm = () => {
        Object.assign(state, initialState)
    }

    const validateStep1 = () => {
        const {fullName, email, phone} = state;
        if (!fullName.trim()) return false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return false;

        const phoneDigits = phone.replace(/\D/g, '')
        if (phoneDigits.length !== 11) return false;

        return true
    }

    const validateStep2 = () => {
        return state.rating > 0 && state.grade !== ''
    }

    return {
        formData: readonly(state),
        updateFormData,
        resetForm,
        validateStep1,
        validateStep2
    }
}