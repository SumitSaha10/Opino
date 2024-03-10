import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PostContentHome = () => {
    return (
        <div className='flex justify-center items-center gap-2 w-80 m-auto mt-2 p-1 border-solid border-2 border-dark'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full bg-slate-300 text-sm" variant="outline">Write a Post</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Write a Post</DialogTitle>
                        <DialogDescription>
                            What's Happening
                        </DialogDescription>
                    </DialogHeader>

                    <Textarea />

                    <DialogFooter>
                        <Button type="submit">Post</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostContentHome
