"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

interface PasswordStrength {
    strength: number;
    label: string;
    color: string;
}

interface PasswordInputProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onTogglePassword: () => void;
    strength?: PasswordStrength;
    showStrengthIndicator?: boolean;
    confirmPassword?: string;
    showConfirmCheck?: boolean;
    autoComplete?: string;
    required?: boolean;
}

export function PasswordInput({
    id,
    label,
    placeholder,
    value,
    onChange,
    showPassword,
    onTogglePassword,
    strength,
    showStrengthIndicator = false,
    confirmPassword,
    showConfirmCheck = false,
    autoComplete = "new-password",
    required = true,
}: PasswordInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
                {label}
            </Label>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="h-12 pl-12 pr-12 border-slate-300 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm placeholder:text-slate-400"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    autoComplete={autoComplete}
                />
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                </button>
                {showConfirmCheck && confirmPassword && value === confirmPassword && value.length > 0 && (
                    <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
            </div>
            
            {showStrengthIndicator && strength && (
                <PasswordStrengthIndicator password={value} strength={strength} />
            )}
            
            {confirmPassword && value !== confirmPassword && confirmPassword.length > 0 && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                    <span>Passwords do not match</span>
                </p>
            )}
        </div>
    );
}
