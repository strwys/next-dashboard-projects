"use client";

import React, { FC, useState } from "react";
import { User, Lock, Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInFormSchema } from "@/lib/form-schema";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react"

import Link from "next/link";

interface SignInPageProps {
}

const SignInPage: FC<SignInPageProps> = ({}) => {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Form Hook
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      userid: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInFormSchema>) => {
    
    console.log("data-->",data)

    const authenticated = await signIn("credentials", {
        ...data,
        redirect: false,
    });
    
    if (authenticated?.error) {
        setError(authenticated.error)
        return;
    }

    await router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-xl shadow-xl rounded-2xl p-8 max-w-md w-full space-y-12 relative overflow-hidden">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-500">Warehouse Management System </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            {/* User ID Field */}
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={18} />
                      </div>
                      <Input
                        {...field}
                        placeholder="User ID"
                        className="pl-10 h-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={18} />
                      </div>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-10 h-12"
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeClosed className="text-gray-400" size={18} />
                        ) : (
                          <Eye className="text-gray-400" size={18} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full h-10">
              Sign In
            </Button>

            {/* Link to Sign Up */}
            <div className="flex items-center justify-center space-x-1 text-sm">
              <span className="text-gray-500">Don't have an account?</span>
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
              >
                Sign up now
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
