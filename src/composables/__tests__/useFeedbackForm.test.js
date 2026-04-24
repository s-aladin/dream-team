import { describe, it, expect, beforeEach } from 'vitest'
import { validateField, createTestFeedbackForm } from '@/composables/useFeedbackForm.js'

describe('validateField', () => {
    it('возвращает ошибку для пустого fullName', () => {
        expect(validateField('fullName', '')).toBe('Поле обязательно')
        expect(validateField('fullName', '   ')).toBe('Поле обязательно')
    })

    it('возвращает пустую строку для корректного fullName', () => {
        expect(validateField('fullName', 'Иван Петров')).toBe('')
    })

    it('проверяет email', () => {
        expect(validateField('email', '')).toBe('Некорректный email')
        expect(validateField('email', 'test@')).toBe('Некорректный email')
        expect(validateField('email', 'test@mail')).toBe('Некорректный email')
        expect(validateField('email', 'test@mail.com')).toBe('')
    })

    it('проверяет телефон (11 цифр)', () => {
        const msg = 'Номер должен содержать 11 цифр'
        expect(validateField('phone', '123')).toBe(msg)
        expect(validateField('phone', '8916123456')).toBe(msg) // 10 цифр
        expect(validateField('phone', '89161234567')).toBe('')
        // допускает нецифровые символы — они удаляются при проверке
        expect(validateField('phone', '+7(916)123-45-67')).toBe('')
    })

    it('проверяет grade', () => {
        expect(validateField('grade', '')).toBe('Выберите грейд')
        expect(validateField('grade', 'junior')).toBe('')
    })

    it('проверяет rating', () => {
        expect(validateField('rating', 0)).toBe('Поставьте оценку')
        expect(validateField('rating', 5)).toBe('')
    })

    it('для неизвестного поля возвращает пустую строку', () => {
        expect(validateField('something', '')).toBe('')
    })
})

// Тесты шагов валидации на изолированном экземпляре
describe('validateStep1 и validateStep2', () => {
    let form

    beforeEach(() => {
        form = createTestFeedbackForm()
    })

    describe('validateStep1', () => {
        it('возвращает false при пустом fullName и записывает ошибку', () => {
            form.updateFormData({ fullName: '', email: 'a@b.c', phone: '89161234567' })
            expect(form.validateStep1()).toBe(false)
            expect(form.errors.fullName).toBe('Поле обязательно')
        })

        it('возвращает false при некорректном email', () => {
            form.updateFormData({ fullName: 'Иван', email: 'плохой', phone: '89161234567' })
            expect(form.validateStep1()).toBe(false)
            expect(form.errors.email).toBe('Некорректный email')
        })

        it('возвращает false при некорректном телефоне', () => {
            form.updateFormData({ fullName: 'Иван', email: 'a@b.c', phone: '123' })
            expect(form.validateStep1()).toBe(false)
            expect(form.errors.phone).toBe('Номер должен содержать 11 цифр')
        })

        it('возвращает true при всех корректных данных', () => {
            form.updateFormData({ fullName: 'Иван', email: 'a@b.c', phone: '89161234567' })
            expect(form.validateStep1()).toBe(true)
            expect(form.errors.fullName).toBe('')
            expect(form.errors.email).toBe('')
            expect(form.errors.phone).toBe('')
        })
    })

    describe('validateStep2', () => {
        it('возвращает false без grade и rating', () => {
            form.updateFormData({ grade: '', rating: 0 })
            expect(form.validateStep2()).toBe(false)
            expect(form.errors.grade).toBe('Выберите грейд')
            expect(form.errors.rating).toBe('Поставьте оценку')
        })

        it('возвращает true с выбранным grade и rating > 0', () => {
            form.updateFormData({ grade: 'junior', rating: 4 })
            expect(form.validateStep2()).toBe(true)
            expect(form.errors.grade).toBe('')
            expect(form.errors.rating).toBe('')
        })
    })
})