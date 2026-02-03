'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/loginSchema";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  // console.log(searchParams.get('callback-url'));
  const callbackUrl = searchParams.get('callback-url');

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onBlur'
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl ?? '/',
      redirect: false
    });
    console.log(res);
    if (res?.ok) {
      //home
      toast.success('Logged in successfully!');
      window.location.href = res.url || '/';

    }else{
      toast.error('Invalid email or password');
    }
    setIsLoading(false)
  }

  return (
   <div className="w-full lg:w-1/2 m-auto flex justify-center items-center">
    <Card className="w-full sm:max-w-xl xl:max-w-2xl ">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 font-bold">Login Now!</CardTitle> 
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                    </div>
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Example@gmail.com"
                        className="ps-9"
                      />                  
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-[.65rem] pointer-events-none">
                      <svg 
                        className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={24} 
                        height={24} 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          stroke="currentColor" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                        />
                      </svg>                    
                    </div>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      type={showPass? 'text' : 'password' }
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
                      className="ps-9"
                    />  
                    <button
                      type="button"
                      className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass? (
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={24} 
                          height={24} 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke="currentColor" 
                            strokeWidth={2} 
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path 
                            stroke="currentColor" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={24} 
                          height={24} 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>             
                  </div>
                  
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-3">
        <Field orientation="horizontal">
          {/* <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button> */}
          <Button disabled={isLoading} className="w-full cursor-pointer" type="submit" form="form-rhf-demo">
            {isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </Field>
        <div className="text-sm font-medium text-gray-800">Not registered? <Link href="/register" className="text-fg-brand hover:underline duration-75">Create account!</Link></div>
      </CardFooter>
    </Card>
   </div>
  )
}
