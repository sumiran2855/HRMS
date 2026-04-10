import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { RegisterFormData } from "@/types/auth.types"
import { useAuth } from "@/providers/auth.provider"
import { AppError } from "@/utils/AppError"
import { useErrorAlert } from "@/contexts/AlertContext"

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()
    const { setAuth } = useAuth()
    const showErrorAlert = useErrorAlert()
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        role: "employee",
        agreeToTerms: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validate terms agreement
        if (!formData.agreeToTerms) {
            showErrorAlert("You must agree to the Terms of Service and Privacy Policy")
            return
        }
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            showErrorAlert("Passwords do not match")
            return
        }

        // Validate password strength
        const strength = passwordStrength()
        if (strength.strength < 60) {
            showErrorAlert("Password is too weak. Please use a stronger password.")
            return
        }

        setIsLoading(true)

        try {
            const { email, username, password, fullName, role } = formData
            const response = await authService.register({ 
                email, 
                username, 
                password, 
                fullName, 
                role 
            })

            if (response.success) {
                const { user, accessToken, refreshToken } = response.data
                setAuth(user, accessToken, refreshToken)
                router.push("/dashboard")
            } else {
                showErrorAlert(response.message || "Registration failed")
            }
        } catch (err) {
            const errorMessage = err instanceof AppError
                ? err.message
                : (err as any)?.message || (err as any)?.details || "Registration failed. Please try again."

            showErrorAlert(errorMessage)
            console.info('Registration error caught:', err)
        } finally {
            setIsLoading(false)
        }
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
