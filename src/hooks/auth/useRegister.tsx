import { useState } from "react"

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
    }

    const passwordStrength = () => {
        const password = formData.password
        if (password.length === 0) return { strength: 0, label: "", color: "" }

        let strength = 0
        const checks = {
            length: password.length >= 8,
            hasLower: /[a-z]/.test(password),
            hasUpper: /[A-Z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            longLength: password.length >= 12
        }

        if (checks.length) strength += 20
        if (checks.hasLower && checks.hasUpper) strength += 20
        if (checks.hasNumber) strength += 20
        if (checks.hasSpecial) strength += 20
        if (checks.longLength) strength += 20

        if (strength <= 40) return { strength, label: "Weak", color: "bg-red-500" }
        if (strength <= 60) return { strength, label: "Fair", color: "bg-yellow-500" }
        if (strength <= 80) return { strength, label: "Good", color: "bg-blue-500" }
        return { strength: 100, label: "Strong", color: "bg-green-500" }
    }

    const strength = passwordStrength()

    return {
        isLoading,
        showPassword,
        showConfirmPassword,
        formData,
        setFormData,
        handleSubmit,
        strength,
        setShowPassword,
        setShowConfirmPassword,
    }
}
