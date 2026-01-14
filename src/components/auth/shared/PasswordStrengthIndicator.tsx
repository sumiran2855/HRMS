interface PasswordStrength {
    strength: number;
    label: string;
    color: string;
}

interface PasswordStrengthIndicatorProps {
    password: string;
    strength: PasswordStrength;
}

export function PasswordStrengthIndicator({ password, strength }: PasswordStrengthIndicatorProps) {
    if (!password) return null;

    return (
        <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Password strength</span>
                <span className={`text-xs font-semibold ${strength.strength === 100 ? 'text-green-600' :
                    strength.strength >= 75 ? 'text-blue-600' :
                        strength.strength >= 50 ? 'text-yellow-600' :
                            'text-red-600'
                    }`}>
                    {strength.label}
                </span>
            </div>

            <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 25 ? strength.color : 'bg-slate-200'
                    }`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 50 ? strength.color : 'bg-slate-200'
                    }`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 75 ? strength.color : 'bg-slate-200'
                    }`} />
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.strength >= 100 ? strength.color : 'bg-slate-200'
                    }`} />
            </div>

            {strength.strength < 75 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                    <div className="flex gap-2">
                        <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-red-800 mb-1">Weak password</p>
                            <ul className="text-xs text-red-700 space-y-0.5">
                                <li className="flex items-start gap-1.5">
                                    <span className={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                                        {password.length >= 8 ? '✓' : '•'}
                                    </span>
                                    <span>At least 8 characters</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                                        {/[A-Z]/.test(password) && /[a-z]/.test(password) ? '✓' : '•'}
                                    </span>
                                    <span>Mix of uppercase & lowercase</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className={/[0-9]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                                        {/[0-9]/.test(password) ? '✓' : '•'}
                                    </span>
                                    <span>At least one number</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '•'}
                                    </span>
                                    <span>Special character (!@#$%^...)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {strength.strength >= 75 && strength.strength < 100 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mt-2">
                    <div className="flex gap-2 items-start">
                        <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-blue-700">Good password! Add more characters or special symbols for better security.</p>
                    </div>
                </div>
            )}

            {strength.strength === 100 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 mt-2">
                    <div className="flex gap-2 items-start">
                        <svg className="w-4 h-4 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium text-green-700">Excellent! Your password is strong and secure.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
