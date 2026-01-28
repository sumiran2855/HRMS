import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { AuthFormData } from "@/types/auth.types"
import { useAuthStore } from "@/store/auth.store"
import { AppError } from "@/utils/AppError"
import { useErrorAlert } from "@/contexts/AlertContext"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { setAuth } = useAuthStore()
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
            const response = await authService.login({
                email: formData.email,
                password: formData.password
            })

            if (response.success) {
                authService.setToken(response.data.token, formData.rememberMe)
                setAuth(response.data.user, response.data.token)
                router.push("/dashboard")
            } else {
                showErrorAlert(response.message || "Login failed");
            }
        } catch (err: any) {
            let errorMessage = "Login failed. Please try again.";

            if (err instanceof AppError) {
                errorMessage = err.message;
                showErrorAlert(err.message);
            } else {
                errorMessage = err?.message || err?.details || "Login failed. Please try again.";
                showErrorAlert(errorMessage);
            }

            console.info('Login error caught:', err);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        showPassword,
        formData,
        setFormData,
        handleSubmit,
        setShowPassword,
    }
}
