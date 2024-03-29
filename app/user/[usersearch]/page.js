"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLeftLong
} from "@fortawesome/free-solid-svg-icons";
import coverImage from '../../assets/cover.png'
import profileImage from '../../assets/profile.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import Post from '@/app/components/Post';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from '@/components/ui/textarea';
import { ClipLoader } from 'react-spinners';
const page = ({ params }) => {
    let username = params.usersearch;
    let [user, setUser] = useState(null || { name: "", email: "", username: "", followers: [], following: [] })
    let [posts, setPosts] = useState([])
    let [userLoading, setUserLoading] = useState(false)
    const { toast } = useToast()
    useEffect(() => {
        getUser()
        getPosts()
    }, [1])
    async function getUser() {
        try {
            setUserLoading(true)
            await fetch("http://localhost:3000/api");
            let res = await fetch("http://localhost:3000/api/user/getothersdata", {
                method: "GET",
                headers: {
                    "username": username
                }
            })
            let data = await res.json()
            setUserLoading(false)
            if (data.success) {
                setUser({
                    name: data.user.name,
                    email: data.user.email,
                    username: data.user.username,
                    followers: data.user.followers,
                    following: data.user.following
                })
            } else {
                setUser(null)
            }
        } catch (error) {
            setUserLoading(false)
            toast({
                variant: "destructive",
                title: "Internal Server error",
            })
        }
    }

    async function getPosts() {
        try {

            let res = await fetch("http://localhost:3000/api/postsdata/fetchallposts", {
                method: "GET",
                headers: {
                    "username": username
                }
            })
            let data = await res.json()

            if (data.success) {
                setPosts(data.posts)
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Internal Server error",
            })
        }
    }

    return (
        <>
            {userLoading ? <ClipLoader className='text-center p-3' /> : ""}
            {!user ?
                (
                    <div className='m-auto w-[600px] flex flex-col items-center justify-center h-[100vh] max-sm:w-[100%] '>
                        <h2 className='text-3xl font-bold'>Page not found :(</h2>
                        <div>Click here to return <Link href="http://localhost:3000" className='text-blue-600'>Home</Link></div>
                    </div>
                ) : ""}

            {user && !userLoading &&
                (

                    <div className='profile w-[600px] flex flex-col gap-2 bg-gray-50 m-auto h-full max-sm:w-[100%]'>
                        <header className='border-b-2 font-bold flex items-center gap-2'><a href='http://localhost:3000'><FontAwesomeIcon icon={faLeftLong} className='text-3xl' /></a><span className='text-2xl'>{username}</span></header>
                        <img src={coverImage.src} className='w-[100%] h-44' />
                        <img src={profileImage.src} className='w-28 rounded-full -mt-16 ml-4 border-b-2' />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <h2>Profile Picture</h2>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <img src={profileImage.src} />
                                        <Input
                                            id="profile"
                                            type="file"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <h2>Cover Picture</h2>
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <img src={coverImage.src} className='w-[100%]' />
                                        <Input
                                            id="profile"
                                            type="file"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue={"dkfk"}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="bio" className="text-right">
                                            Bio
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            defaultValue={user?.bio}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <div className='name ml-4 font-bold'>{user?.name}</div>
                        <div className='username ml-4 font-bold text-gray-500'>@{user?.username}</div>
                        <div className="bio ml-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex similique beatae optio officiis corporis et dolorem, sunt atque aliquam in repellendus, nihil quidem id saepe at minima ea ab vel odit facere.</div>
                        <div className="showFollowers flex gap-3 ml-4">
                            <div className='font-bold'>{user?.followers?.length} Followers</div>
                            <div className='font-bold'>{user?.following?.length} Following</div>
                        </div>
                        <div className='profileBottom ml-2'>
                            <Tabs defaultValue="posts" className="">
                                <TabsList>
                                    <TabsTrigger value="posts">Posts</TabsTrigger>
                                    <TabsTrigger value="followers">Followers</TabsTrigger>
                                    <TabsTrigger value="following">Following</TabsTrigger>
                                </TabsList>
                                <TabsContent value="posts" className="w-full flex flex-col justify-center items-center">
                                    {posts.length === 0 ? "No posts created" : (
                                        posts?.map((e, i) => {
                                            return <Post key={i} post={e} />
                                        })
                                    )}
                                </TabsContent>
                                <TabsContent value="followers">Followers</TabsContent>
                                <TabsContent value="following">Following</TabsContent>
                            </Tabs>

                        </div>
                    </div>
                )}

        </>
    )
}

export default page;
