import Link from 'next/link'
import Footer from '../../../components/Footer'

export default function New() {
  return (
    <main className='bg-white min-h-screen flex flex-col justify-center'>
      <div className='w-[680px] flex flex-col items-center text-center pt-6 px-12 text-xl gap-3 mx-auto'>
        <Link href='/'>
          <img
            className='w-16'
            src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png'
            alt='Dev.to'
          ></img>
        </Link>
        <h5 className='p-3 font-bold text-4xl'>Join the DEV Community</h5>
        <p className='text-lg'>
          DEV Community is a community of 1,380,964 amazing developers
        </p>

        <Link
          href='/user/signup/apple'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/apple.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Apple
          </span>
        </Link>
        <Link
          href='/user/signup/forem'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/equalizer.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Forem
          </span>
        </Link>
        <Link
          href='/user/signup/github'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/github.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with GitHub
          </span>
        </Link>
        <Link
          href='/user/signup/twitter'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/twitter.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Twitter
          </span>
        </Link>
        <Link
          href='/user/signup/register'
          className='w-full flex p-4 border border-zinc-300 rounded-md hover:bg-zinc-100'
        >
          <img className='h-6 w-6' src='/email.svg' alt='' />
          <span className='text-center w-full text-base font-semibold'>
            Sign up with Email
          </span>
        </Link>

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
          Already have an account?{' '}
          <span className='text-[rgb(59,73,223)]'>
            {' '}
            <Link href='/user/login'>Log in.</Link>
          </span>
        </p>
      </div>
      <Footer />
    </main>
  )
}
