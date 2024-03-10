"use client"
import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleUser
} from "@fortawesome/free-solid-svg-icons";
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
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { toast } = useToast()


    const handleFormLogin = async () => {
        try {
            await fetch('http://localhost:3000/api')
            const res = await fetch('http://localhost:3000/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password })
            });
            const json = await res.json()
            if (json.authToken) {
                toast({
                    title: "Logged In Successfully",
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
        <Card className="w-[350px] m-auto mt-6">
            <FontAwesomeIcon icon={faCircleUser} className="m-auto w-full text-5xl -mt-8 z-10" />
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to continue Opino</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
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
                <Button className="bg-black" onClick={handleFormLogin}>Login</Button>
            </CardFooter>
            <div className="text-center">Don't have account <a href="/signup" className="text-blue-500">Sign Up</a></div>
        </Card>
    )
}

export default page