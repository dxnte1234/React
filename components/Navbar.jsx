import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import SearchInput from './SearchInput'

export default function Navbar({ posts, setSearchPosts }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  const [screen, setScreen] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [isLogged, setIsLogged] = useState(null)
  const [userPost, setUserPost] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setUserPost(JSON.parse(localStorage.getItem('user')))
    if (token) {
      setIsLogged(true)
    } else{ setIsLogged(false)}
  }, [isLogged])

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


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <nav className='bg-white text-lg border-zinc-100'>
      <section
        className= 'w-full fixed top-0 bg-white px-2 flex justify-between items-center xl:px-[72px]'
      >
        <div className='p-2 flex gap-4 items-center'>
          <div className='flex gap-2 items-center'>
            <img
              className='h-8 w-8 sm:hidden'
              src='/menu.svg'
              alt=''
              // TODO para el menu lateral
            />
            <Link href='/' className='flex items-center'>
              <img className='h-12' src='/devlogo.png' alt='Dev.to' />
            </Link>
          </div>
          <div
            className={clsx(
              'md:w-80 xl:w-96 w-72 border-2 rounded-lg sm:block hidden',
              { hidden: !showSearch }
            )}
          >
            <SearchInput list={posts} function={setSearchPosts} />
          </div>
        </div>
        <div className='flex gap-1 md:gap-2 items-center'>
          <button
            id='searchButton'
            className={clsx(
              'h-12 w-12 px-1 rounded-md flex items-center justify-center',
              { hidden: showSearch || screen !== 'mobile' }
            )}
            type='button'
            onClick={()=> setShowSearch(true)}
          >
            <img
              className='h-8 w-8 text-transparent text-indigo-400'
              src='/search.svg'
              alt=''
            />
          </button>
          <div className={''}>
            <button
              id='loginButton'
              type='button'
              className={clsx('hover:bg-violet-100 py-2 px-4 rounded-md', {
                hidden: isLogged
              })}
            >
              <Link href='/user/login'>Log in</Link>
            </button>
            <button
              id='createAccountButton'
              type='button'
              className={clsx(
                'hover:bg-indigo-600 border-2 border-indigo-600 text-indigo-600 hover:text-white font-semibold py-2 px-6 rounded-md',
                { hidden: showSearch || screen === 'mobile' || isLogged }
              )}
            >
              <Link href='/user/signup'>Create account</Link>
            </button>
          </div>
        </div>
        <div
          id='loggedBoxNav'
          className={clsx('flex items-center gap-2', {
            hidden: !isLogged || showSearch
          })}
        >
          <div
            id='createPostButton'
            className={clsx(
              'hover:bg-indigo-600 border-2 border-indigo-600 text-indigo-600 hover:text-white font-semibold py-2 px-6 rounded-md',
              { hidden: screen === 'mobile' }
            )}
          >
            <Link
              href='/post/create'
              className='text-decoration: none; color: white;'
            >
              Create a post
            </Link>{' '}
          </div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='currentColor'
            className='bi bi-bell'
            viewBox='0 0 16 16'
          >
            <path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z' />
          </svg>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white shadow-sm border-2 border-purple-600 '>
                <img
                  src={userPost?.profile_picture || '/user.svg'}
                  alt=''
                  height={32}
                  width={32}
                  className='rounded-full'
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <image
                        href='/'
                        className={
                          (active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm')
                        }
                      >
                        <p className='font-semibold'>
                          {userPost?.first_name || 'Invited'}
                        </p>
                        <p className='text-xs'>{userPost?.email || ''}</p>
                      </image>
                    )}
                  </Menu.Item>
                  <hr className='w-full border border-zinc-200' />
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='/post/create'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Create Post
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='/post/create'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Reading list
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='/'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <hr className='w-full border border-zinc-200' />
                  <form method='POST' action='#'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type='submit'
                          onClick={() => {
                            setIsLogged(null)
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                          }}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </section>
      {/*  */}
    </nav>
  )
}
