'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/loginSchema";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);  
  }

  return (
   <div className="w-full lg:w-1/2 m-auto flex justify-center items-center">
    <Card className="w-full sm:max-w-xl xl:max-w-2xl ">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 font-bold">Login Now!</CardTitle> 
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                        placeholder="Enter Your Email"
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
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
                      className="ps-9"
                    />               
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
          <Button className="w-full cursor-pointer" type="submit" form="form-rhf-demo">
            Login
          </Button>
        </Field>
        <div className="text-sm font-medium text-gray-800">Not registered? <Link href="/register" className="text-fg-brand hover:underline duration-75">Create account!</Link></div>
      </CardFooter>
    </Card>
   </div>
  )
}
