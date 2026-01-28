import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { AuthFormData } from "@/types/auth.types"
import { useAuth } from "@/providers/auth.provider"
import { AppError } from "@/utils/AppError"
import { useErrorAlert } from "@/contexts/AlertContext"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { setAuth, logout: authLogout, user } = useAuth()
    const showErrorAlert = useErrorAlert()
    const [formData, setFormData] = useState<AuthFormData>({
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { email, password } = formData
            const response = await authService.login({ email, password })

            if (response.success) {
                const { user, accessToken, refreshToken } = response.data
                setAuth(user, accessToken, refreshToken)
                router.push("/dashboard")
            } else {
                showErrorAlert(response.message || "Login failed")
            }
        } catch (err) {
            const errorMessage = err instanceof AppError
                ? err.message
                : (err as any)?.message || (err as any)?.details || "Login failed. Please try again."

            showErrorAlert(errorMessage)
            console.info('Login error caught:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await authService.logout()
        } catch (err) {
            console.info('Logout error caught:', err)
        } finally {
            authLogout()
        }
    }

    return {
        user,
        isLoading,
        showPassword,
        formData,
        setFormData,
        handleSubmit,
        handleLogout,
        setShowPassword,
    }
}
