import { useState } from "react"
import { useRouter } from "next/navigation"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        router.push("/dashboard")
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
