import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AppwriteException } from 'appwrite'
import { client } from '../lib/appwrite'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [status, setStatus] = useState('idle')

  async function sendPing() {
    if (status === 'loading') return
    setStatus('loading')
    try {
      const result = await client.ping()
      const log = {
        date: new Date(),
        method: 'GET',
        path: '/v1/ping',
        status: 200,
        response: JSON.stringify(result),
      }
      setStatus('success')
    } catch (err) {
      const log = {
        date: new Date(),
        method: 'GET',
        path: '/v1/ping',
        status: err instanceof AppwriteException ? err.code : 500,
        response:
          err instanceof AppwriteException
            ? err.message
            : 'Something went wrong',
      }
      setStatus('error')
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-6 mb-6">
            <img
              src="/tanstack-circle-logo.png"
              alt="TanStack Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              Why Appwrite?
            </h1>
            <p className="text-white text-xl">
              Because I put this site live up on Appwrite sites in less than 5
              minutes with Tanstack Start, and so can you!
            </p>
            <p>
              <button
                onClick={sendPing}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
              >
                Check Appwrite connectivity
              </button>
            </p>
            <p>
              {status === 'success' ? (
                <h1 className="font-[Poppins] text-2xl font-light text-white">
                  Appwrite ping successful!
                </h1>
              ) : status === 'loading' ? (
                <h1 className="font-[Poppins] text-2xl font-light text-white">
                  Checking connection...
                </h1>
              ) : null}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
