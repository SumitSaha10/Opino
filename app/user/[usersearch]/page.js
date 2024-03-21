"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLeftLong
} from "@fortawesome/free-solid-svg-icons";
import coverImage from '../../assets/cover.jpg'
import profileImage from '../../assets/profile.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';

async function getUser(username) {
    try {
        await fetch("http://localhost:3000/api");
        let res = await fetch("http://localhost:3000/api/user/getothersdata", {
            method: "GET",
            headers: {
                "username": username
            }
        })
        if (!res.ok) {
            return null;
        }
        return res.json()
    } catch (error) {
        return null
    }
}

const page = async ({ params }) => {
    let username = params.usersearch;
    let user = await getUser(username);
    if (user) {
        user = user.user;
    }
    return (
        <>
            {!user ?
                (
                    <div className='m-auto w-[600px] flex flex-col items-center justify-center h-[100vh] max-sm:w-[100%] '>
                        <h2 className='text-3xl font-bold'>Page not found :(</h2>
                        <div>Click here to return <Link href="http://localhost:3000" className='text-blue-600'>Home</Link></div>
                    </div>
                ) :
                (
                    <div className='profile w-[600px] flex flex-col gap-2 bg-gray-100 m-auto h-full max-sm:w-[100%]'>
                        <header className='border-b-2 font-bold flex items-center gap-2'><a href='http://localhost:3000'><FontAwesomeIcon icon={faLeftLong} className='text-3xl' /></a><span className='text-2xl'>{username}</span></header>
                        <img src={coverImage.src} className='w-[100%] h-44' />
                        <img src={profileImage.src} className='w-28 rounded-full -mt-16 ml-4 border-b-2' />
                        <div className='name ml-4 font-bold'>{user.name}</div>
                        <div className='username ml-4 font-bold text-gray-500'>@{user.username}</div>
                        <div className="bio ml-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex similique beatae optio officiis corporis et dolorem, sunt atque aliquam in repellendus, nihil quidem id saepe at minima ea ab vel odit facere.</div>
                        <div className="showFollowers flex gap-3 ml-4">
                            <div className='font-bold'>{user.followers.length} Followers</div>
                            <div className='font-bold'>{user.following.length} Following</div>
                        </div>
                        <div className='profileBottom ml-2'>
                            <Tabs defaultValue="posts" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="posts">Posts</TabsTrigger>
                                    <TabsTrigger value="followers">Followers</TabsTrigger>
                                    <TabsTrigger value="following">Following</TabsTrigger>
                                </TabsList>
                                <TabsContent value="posts">Post here</TabsContent>
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
