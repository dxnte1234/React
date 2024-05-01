import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export default function NewPost() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  const [preSave, setPreSave] = useState(null)
  useEffect(() => {
    if (preSave !== null) {
      localStorage.setItem('postSaved', JSON.stringify(preSave))
    }
  }, [preSave])

  function infoToLocalHandler(data) {
    setPreSave(data)
  }

  function onSubmit(data) {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    if (token) {
      fetch(
        'https://node-backend-2-prod.up.railway.app/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: data.title,
            tags: data.tags,
            content: data.content,
            cover: data.cover,
            user: user.id
          })
        }
      )
        .then((res) => {
          if (res.status !== 201) alert('Ops! Something went wrong.')
          alert('New post created')
          router.push('/')
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <main className='bg-zinc-100 min-h-screen w-screen text-lg'>
      <div className='flex gap-2 p-4 w-full justify-end items-center'>
        <button className='font-semibold'>Edit</button>
        <button>Preview</button>
        <button>
          {' '}
          <img
            className='h-6 w-6 items-center'
            src='/close-sm.svg'
            alt='close'
            onClick={()=> router.push('/')}
          />
        </button>{' '}
      </div>
      <div className='md:flex items-center hidden'>
        <span href='/' className='items-center' onClick={()=> router.push('/')}>
          <img
            className='h-10'
            src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png'
            alt='Dev.to'
          />
        </span>
        <h2 className='ml-3 text-3xl font-semibold'>Create Post</h2>
      </div>
      <div className='flex'>
        <div className=' rounded-lg p-3 inline-block md:w-4/5 h-screen'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3 '>
              <div className='flex flex-col gap-2 w-full'>
                <h4 className='text-xl font-semibold'>Add a cover image</h4>
                <input
                  {...register('cover', { required: true })}
                  placeholder='Introduce your URL'
                  className='w-full flex px-4 py-2 border border-zinc-300 rounded-md hover:bg-zinc-100'
                />
                {errors.cover && (
                  <span className='text-red-500'>Cover is required</span>
                )}
                <input
                  {...register('title', { required: true })}
                  className='text-3xl font-bold text-black w-full p-2'
                  rows='1'
                  type='text'
                  placeholder='New post title here...'
                />
                {errors.title && (
                  <span className='text-red-500'>Title is required</span>
                )}
                <input
                  {...register('tags', { required: true })}
                  className='w-full flex px-4 py-2 border border-zinc-300 rounded-md hover:bg-zinc-100'
                  rows='1'
                  type='text'
                  placeholder='Add up to 4 tags...'
                />
                {errors.tags && (
                  <span className='text-red-500'>4 tags are required</span>
                )}
                <textarea
                  {...register('content', { required: true })}
                  className={clsx(
                    'w-full flex px-4 py-2 border rounded-md',
                    { overflowY: 'auto' }
                  )}
                  rows= '10'
                  placeholder='Write your post content here...'
                />
                {errors.content && (
                  <span className='text-red-500'>Body is required</span>
                )}
              </div>
            </div>
            <div className='flex gap-2'>
              <button
                type='submit'
                className='py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-[rgb(59,73,223)] hover:bg-[rgb(47,58,178)]'
              >
                Publish
              </button>
              <button
                onClick={handleSubmit((data) => {
                  infoToLocalHandler(data)
                })}
                className='hover:bg-violet-100 py-2 px-4 rounded-md'
              >
                Save
              </button>
            </div>
          </form>
        </div>

        <div className='md:block hidden md:w-60 pr-4  text-xs'>
          <p className='text-base mb-3 font-bold'>Publishing Tips</p>
          <ul className='grid gap-3'>
            <li>
              Ensure your post has a cover image set to make the most of the
              home feed and social media platforms.
            </li>
            <li>
              Share your post on social media platforms or with your co-workers
              or local communities.
            </li>
            <li>
              Ask people to leave questions for you in the comments. It is a
              great way to spark additional discussion describing personally why
              you wrote it or why people might find it helpful.
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
