"use client"

import { useState } from "react";
import {useForm} from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import {z} from "zod";

import { signupSchema } from "@/schemas/signUpSchema";
import { use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Result } from "pg";

export default function SignUpForm() {
    const [verifying, setVerifying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [setVerificationCode] = useState ("")
    const [authError, setAuthError] = useState<string | null>(null);

    const { signUp, isLoaded, setActive } = useSignUp();

    const{
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        if (!isLoaded) 
            return;
        setIsSubmitting(true);
        setAuthError(null);

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setVerifying(true);
        } catch (error: any) {
            console.error("Sign up error:", error);
            setAuthError(
                error.errors?.[0]?.message || "An unexpected error occurred. Please try again."
            )
        }
        finally{
            setIsSubmitting(false);
        }    };

    const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoaded || !signUp) 
            return
         setIsSubmitting(true);
        setAuthError(null);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: setVerificationCode,
            });
            if(result.status === "complete") {
                await setActive({ session: result.createdSessionId });
            }
        } catch (error) {
            
        }
    };

    if (verifying) {
        return(
            <h1>Otp entering field</h1>
        ) 

    }

    return(
        <h1>signup form with email and other fields</h1>
    )
}