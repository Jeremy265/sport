/**
 * Password validator for login pages
 */
import values from '../assets/scss/_themes-vars.module.scss'

// has password
const haspassword = (password: string) => new RegExp(/[0-9]/).test(password)

// has mix of small and capitals
const hasMixed = (password: string) => new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password)

// has special chars
const hasSpecial = (password: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(password)

// set color based on password strength
export const strengthColor = (count: number) => {
    if (count < 2) return { label: 'Poor', color: values.errorMain }
    if (count < 3) return { label: 'Weak', color: values.warningDark }
    if (count < 4) return { label: 'Normal', color: values.orangeMain }
    if (count < 5) return { label: 'Good', color: values.successMain }
    if (count < 6) return { label: 'Strong', color: values.successDark }
    return { label: 'Poor', color: values.errorMain }
}

// password strength indicator
export const strengthIndicator = (password: string) => {
    let strengths = 0
    if (password.length > 5) strengths += 1
    if (password.length > 7) strengths += 1
    if (haspassword(password)) strengths += 1
    if (hasSpecial(password)) strengths += 1
    if (hasMixed(password)) strengths += 1
    return strengths
}
