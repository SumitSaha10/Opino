"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
const page = () => {
    const router = useRouter()
    React.useEffect(() => {
        if (localStorage.getItem("authOpino")) {
            router.push('/')
        }
    }, [1])
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { toast } = useToast()

    const handleFormSubmit = async () => {
        try {
            await fetch('http://localhost:3000/api')
            const res = await fetch('http://localhost:3000/api/user/createuser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, email: email, password: password })
            });
            const json = await res.json()
            if (json.authToken) {
                toast({
                    title: "Account Created",
                    description: "Your Account Successfully Created",
                })
                localStorage.setItem("authOpino", json.authToken)
                router.push('/')

            }
            else {
                toast({
                    variant: "destructive",
                    description: `${json.errorMessage}`,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }
    return (
        <Card className="w-[350px] m-auto mt-4">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Create account to continue Opino</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" type="text" placeholder="Your Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="bg-black" onClick={handleFormSubmit}>Sign Up</Button>
            </CardFooter>
            <div className="text-center">Already have an account <a href="/login" className="text-blue-500">Log In</a></div>
        </Card>
    )
}

export default page