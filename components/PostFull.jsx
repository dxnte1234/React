import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export default function PostFull() {
  const [postInfo, setPostInfo] = useState(null)
  const [date, setDate] = useState(null)
  const [screen, setScreen] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    fetch(
      `https://node-backend-2-prod.up.railway.app/post/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPostInfo(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreen('mobile')
      } else if (width >= 640 && width < 1024) {
        setScreen('tablet')
      } else {
        setScreen('xl')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (postInfo) {
      const dateObj = new Date(postInfo.createdAt)
      const month = dateObj.toLocaleString('default', { month: 'short' })
      const day = dateObj.getDate()
      setDate(`${month} ${day}`)
    }
  }, [postInfo])

  return (
    <article
      className={clsx(' bg-white pb-4 text-lg mt-12 overflow-hidden', {
        'w-full rounded-md ': screen !== 'mobile'
      })}
    >
      <div className='grid gap-2 md:gap-8'>
        <img src={postInfo?.cover} alt='post picture' className='content-fit' />
        <div className='px-4 grid gap-8'>
          <div className='flex items-center gap-2 md:px-8'>
            <img
              className='w-10 rounded-full'
              src={postInfo?.user?.profile_picture}
              alt='u'
            />
            <div>
              <p className='font-semibold'>
                {postInfo?.user?.first_name || 'Anonymus'}
              </p>
              <p className='text-xs capitalize'>{date || 'something'}</p>
            </div>
          </div>
          <div className='grid gap-2 md:px-8'>
            <div
              className={clsx('flex gap-4 md:justify-start justify-around ', {
                
              })}
            >
              <span>🦄45</span>
              <span>❤️12</span>
              <span>🎉16</span>
              <span>🤯8</span>
              <span>🔥7</span>
            </div>

            <h1 className='font-bold md:font-extrabold capitalize text-3xl'>
              {postInfo?.title}
            </h1>
            <div className='flex gap-2'>
              {postInfo?.tags?.split(',').map((tag, index) => (
                <span key={`tag-${index}`} className='text-base'>
                  #{tag.trim()}
                </span>
              ))}
            </div>

            <p className='text-justify pt-4 text-lg md:text-base'>
              {postInfo?.content}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
