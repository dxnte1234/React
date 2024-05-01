import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Footer from '../../../components/Footer'

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  function onSubmit(data) {
    fetch(
      'https://node-backend-2-prod.up.railway.app/user/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.data.token) {
          localStorage.setItem('token', json.data.token)
          fetch(
            `https://node-backend-2-prod.up.railway.app/user/${data.email}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${json.data.token}`
              }
            }
          )
            .then((res) => res.json())
            .then((json) => {
              const user = JSON.stringify({
                id: json.data._id,
                email: json.data.email,
                first_name: json.data.first_name,
                profile_picture: json.data.profile_picture
              })
              localStorage.setItem('user', user)
            })
            .catch((err) => {
              console.log('Error fetching user data:', err)
            })
          router.push('/')
        } else {
          setError('root', { message: 'Invalid data' })
        }
      })
      .catch((err) => {
        alert('Invalid data, verify your information')
        console.log(err)
      })
  }

  return (
    <main className='bg-white min-h-screen w-full flex flex-col pt-12'>
      <div className='w-[680px] flex flex-col items-center text-center pt-6 px-12 text-xl gap-3 mx-auto'>
        <Link href='/'>
          <img width={70} height={70} src='/devlogo.png' alt='Dev.to'></img>
        </Link>
        <h5 className='p-3 font-bold text-4xl'>Join the DEV Community</h5>
        <p className='text-lg'>
          DEV Community is a community of 1,380,964 amazing developers
        </p>

        <Link
          href='/user/login/apple'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/apple.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Continue with Apple
          </span>
        </Link>
        <Link
          href='/user/login/forem'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/equalizer.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Continue with Forem
          </span>
        </Link>
        <Link
          href='/user/login/github'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/github.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Continue with GitHub
          </span>
        </Link>
        <Link
          href='/user/login/twitter'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/twitter.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Continue with Twitter
          </span>
        </Link>

        <div className='py-6 relative'>
          <hr className='text-slate-800 h-1 w-[580px] items-baseline' />
          <p className=' bg-white px-2 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 text-lg'>
            OR
          </p>
        </div>
        <form
          className='grid gap-4 items-start text-start w-full py-3'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p className='py-2 font-semibold'>Email</p>
            <input
              type='text'
              name='email'
              className={clsx(
                'block w-full p-3 border border-zinc-300 rounded-md',
                {
                  'border-2 border-red-500': errors.email
                }
              )}
              required
              {...register('email', {
                minLength: {
                  value: 3,
                  message: 'Escribe al menos 3 caracteres'
                }
              })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <p className='py-2 font-semibold'>Password</p>
            <input
              type='password'
              name='password'
              className='p-3 block w-full border border-zinc-300 rounded-md shadow-sm sm:text-sm '
              required
              {...register('password')}
            />
            {errors.root && (
              <p className='text-red-500'>{errors.root.message}</p>
            )}
          </div>

          <button
            type='submit'
            className='mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-[rgb(59,73,223)] hover:bg-[rgb(47,58,178)]'
            onSubmit={handleSubmit(onSubmit)}
          >
            Log in
          </button>
          <p className='text-base text-center italic px-12 py-4 text-slate-500'>
            By signing in, you are agreeing to our{' '}
            <span className='text-[rgb(59,73,223)]'>
              {' '}
              privacy policy, terms of use
            </span>{' '}
            and <span className='text-[rgb(59,73,223)]'>code of conduct.</span>
          </p>
          <hr className='text-slate-800 h-1 w-[580px] items-baseline' />
          <p className='text-center text-lg px-12 py-4'>
            New to DEV Community?{' '}
            <span className='text-[rgb(59,73,223)]'>
              {' '}
              <Link href='/user/signup'>Create account</Link>
            </span>
          </p>
        </form>
      </div>
      {/* <Footer /> */}
    </main>
  )
}
