"use client"

import { useState } from "react";
import {useForm} from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import {z} from "zod";

import { signupSchema } from "@/schemas/signUpSchema";
import { use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
    const [verifying, setVerifying] = useState(false);

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
    }

    const handleVerificationSubmit = async () => {}

    if (verifying) {
        return(
            <h1>Otp entering field</h1>
        ) 

    }

    return(
        <h1>signup form with email and other fields</h1>
    )
}