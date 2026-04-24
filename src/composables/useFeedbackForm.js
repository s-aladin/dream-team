import { reactive, readonly, inject, provide } from 'vue'

const FEEDBACK_FORM_KEY = Symbol('feedbackForm')

const initialState = {
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: '',
    grade: '',
    rating: 0,
    quickReplies: []
}

function validateField(field, value) {
    switch (field) {
        case 'fullName':
            return value.trim() ? '' : 'Поле обязательно'
        case 'email': {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(value) ? '' : 'Некорректный email'
        }
        case 'phone': {
            const digits = value.replace(/\D/g, '')
            return digits.length === 11 ? '' : 'Номер должен содержать 11 цифр'
        }
        case 'grade':
            return value ? '' : 'Выберите грейд'
        case 'rating':
            return value > 0 ? '' : 'Поставьте оценку'
        default:
            return ''
    }
}

function createFeedbackFormState() {
    const state = reactive({ ...initialState })
    const errors = reactive({
        fullName: '',
        email: '',
        phone: '',
        grade: '',
        rating: ''
    })

    const debounceTimers = new Map()

    function debouncedValidateField(field, value) {
        if (debounceTimers.has(field)) {
            clearTimeout(debounceTimers.get(field))
        }
        debounceTimers.set(
            field,
            setTimeout(() => {
                if (field in errors) {
                    errors[field] = validateField(field, value)
                }
            }, 500)
        )
    }

    function updateFormData(newData) {
        Object.assign(state, newData)
    }

    function resetForm() {
        Object.assign(state, initialState)
        for (const key in errors) {
            errors[key] = ''
        }
        for (const timer of debounceTimers.values()) {
            clearTimeout(timer)
        }
        debounceTimers.clear()
    }

    function clearErrors(fields) {
        fields.forEach(field => {
            if (field in errors) {
                errors[field] = ''
            }
        })
    }

    function validateStep1() {
        let isValid = true
        const { fullName, email, phone } = state

        const fullNameError = validateField('fullName', fullName)
        if (fullNameError) { errors.fullName = fullNameError; isValid = false }
        else errors.fullName = ''

        const emailError = validateField('email', email)
        if (emailError) { errors.email = emailError; isValid = false }
        else errors.email = ''

        const phoneError = validateField('phone', phone)
        if (phoneError) { errors.phone = phoneError; isValid = false }
        else errors.phone = ''

        return isValid
    }

    function validateStep2() {
        let isValid = true

        const gradeError = validateField('grade', state.grade)
        if (gradeError) { errors.grade = gradeError; isValid = false }
        else errors.grade = ''

        const ratingError = validateField('rating', state.rating)
        if (ratingError) { errors.rating = ratingError; isValid = false }
        else errors.rating = ''

        return isValid
    }

    return {
        formData: readonly(state),
        errors: readonly(errors),
        updateFormData,
        resetForm,
        validateStep1,
        validateStep2,
        debouncedValidateField,
        clearErrors
    }
}

export function provideFeedbackForm() {
    const form = createFeedbackFormState()
    provide(FEEDBACK_FORM_KEY, form)
    return form
}

export function useFeedbackForm() {
    const form = inject(FEEDBACK_FORM_KEY)
    if (!form) {
        throw new Error('useFeedbackForm() должен вызываться внутри компонента с предоставленным provideFeedbackForm()')
    }
    return form
}

export { validateField }

export function createTestFeedbackForm() {
    return createFeedbackFormState()
}