import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard'
import LeftSidebar from '@/components/LeftSideBar'
import RightSide from '@/components/RightSide'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [searchPosts, setSearchPosts] = useState([])
  useEffect(() => {
    fetch('https://node-backend-2-prod.up.railway.app/post')
      .then((res) => res.json())
      .then((data) => setPosts(data.data))
      .catch((err) => console.log('unable to get posts', err))
  }, [])


  return (
    <main className='min-h-screen w-screen bg-zinc-100 '>
      <Navbar posts={posts} setSearchPosts={setSearchPosts} />
      <section className='w-full pt-[72px] flex gap-3 max-w-screen-xl m-auto'>
        <div className='md:block hidden'>
          <LeftSidebar />
        </div>
        <div>
          <div className='flex gap-3 text-lg'>
            <p className='p-2 hover:bg-white hover:text-indigo-600 rounded-mdv font-bold'>
              Relevant
            </p>
            <p className='p-2 hover:bg-white hover:text-indigo-600 rounded-md'>
              Latest
            </p>
            <p className='p-2 hover:bg-white hover:text-indigo-600 rounded-md'>
              Top
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {(posts).map((post, index) => {
              const id = post._id
              return (
                <Link key={`post-${index}`} href={`/post/${id}`}>
                  <PostCard
                    title={post.title}
                    tags={post.tags}
                    content={post.content}
                    cover={post.cover}
                    createdAt={post.createdAt}
                    user={post.user}
                  />
                </Link>
              )
            })}
          </div>
        </div>
        <div className='lg:block hidden'>
          <RightSide />
        </div>
      </section>
    </main>
  )
}
