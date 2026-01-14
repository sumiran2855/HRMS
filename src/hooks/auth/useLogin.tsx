import { useState } from "react"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
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
