"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleUser
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { PropagateLoader } from "react-spinners";
const page = () => {
    let router = useRouter()
    React.useEffect(() => {
        if (localStorage.getItem("authOpino")) {
            router.push('/')
        }
    }, [1])
    let params = useSearchParams()
    let id = params.get("id")
    let token = params.get("token")
    const { toast } = useToast()
    const [password, setPassword] = useState("")
    const [loading, setLoading] = React.useState(false)
    const handleResetPassword = async () => {
        try {
            setLoading(true)
            await fetch('http://localhost:3000/api')
            let res = await fetch(`http://localhost:3000/api/user/resetpassword?id=${id}&token=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            })
            let data = await res.json()
            if (data.success) {
                setLoading(false)
                toast({
                    title: "Password Updated",
                    description: "Your password updated successfully"
                })
                router.push("/login")
            }
            else {
                setLoading(false)
                toast({
                    variant: "destructive",
                    title: "Failed to Update Password",
                    description: `${data.errorMessage}`
                })
            }
        } catch (error) {
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Failed to Update Password",
            })
        }
    }
    return (
        <>
            {loading ? <PropagateLoader color="#f06611" className="text-center p-3" /> : ""}
            <div>
                <Card className="w-[350px] m-auto mt-8">
                    <FontAwesomeIcon icon={faCircleUser} className="m-auto w-full text-5xl -mt-8 z-10 text-orange-500" />
                    <CardHeader>
                        <CardTitle>Reset Password </CardTitle>

                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Password</Label>
                                    <Input id="password" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Confirm Password</Label>
                                    <Input id="cpassword" type="password" placeholder="Confirm Password" />
                                </div>
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button className="bg-orange-400" onClick={handleResetPassword}>Submit</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default page
