import { reactive, readonly, toRefs } from 'vue'

const initialState = {
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: '',
    grade: '',
    rating: 0,
    quickReplies: []
}

export function useFeedbackForm() {
    const formData = reactive({ ...initialState })

    const updateFormData = (newData) => {
        Object.assign(formData, newData)
    }

    const resetForm = () => {
        Object.assign(formData, initialState)
    }

    const validateStep1 = () => {
        const { fullName, email, phone } = formData
        if (!fullName.trim()) return false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return false
        const phoneDigits = phone.replace(/\D/g, '')
        if (phoneDigits.length !== 11) return false
        return true
    }

    const validateStep2 = () => {
        return formData.rating > 0 && formData.grade !== ''
    }

    return {
        formData: readonly(formData),
        updateFormData,
        resetForm,
        validateStep1,
        validateStep2
    }
}