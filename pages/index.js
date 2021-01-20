import Head from 'next/head'
import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1>
          Feedback koa🐨
        </h1>

        <p>
          Get started by editing{' '}
          <code>pages/index.js</code>
        </p>
        {auth?.user ?
          (<button onClick={() => auth.signout()}>Sign out</button>) :
          (<button onClick={() => auth.signinWithGithub()}>Sign in</button>)}
        <div>{auth?.user?.email}</div>

      </main>
    </div>
  )
}
