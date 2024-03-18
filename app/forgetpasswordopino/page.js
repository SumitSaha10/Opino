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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { PropagateLoader } from "react-spinners";
const page = () => {
    const { toast } = useToast()
    let [email, setEmail] = useState("");
    const [loading, setLoading] = React.useState(false)
    const handleForgetPassword = async () => {
        try {
            setLoading(true)
            await fetch("http://localhost:3000/api")
            let res = await fetch("http://localhost:3000/api/user/forgetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
            let json = await res.json()
            if (json.success) {
                setLoading(false)
                toast({
                    title: "Code Succesfully Send",
                    description: `Check email: ${email}`
                })
            }
            else {
                setLoading(false)
                toast({
                    variant: "destructive",
                    title: "Failed to send",
                    description: `${json.errorMessage}`,

                })
            }
        } catch (error) {
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Failed to send",

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
                        <CardTitle>Forget Password</CardTitle>

                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button className="bg-orange-400" onClick={handleForgetPassword}>Send Code</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default page
