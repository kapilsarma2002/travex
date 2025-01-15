'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Image from 'next/image'

const UserProfilePage = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={user.imageUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="space-y-6">
            <div className="bg-neutral-100 dark:bg-zinc-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.firstName ?? ''}
                    disabled
                    className="w-full p-2 rounded-lg border cursor-text
             bg-neutral-100 dark:bg-zinc-900 border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>

                  <input
                    type="text"
                    defaultValue={user.lastName ?? ''}
                    disabled
                    className="w-full p-2 rounded-lg border cursor-text
             bg-neutral-100 dark:bg-zinc-900 border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-100 dark:bg-zinc-900 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Email Addresses</h2>
              {user.emailAddresses.map((email) => (
                <div
                  key={email.id}
                  className="flex items-center justify-between"
                >
                  <span>{email.emailAddress}</span>
                  {email.id === user.primaryEmailAddressId && (
                    <span className="text-sm text-green-600 dark:text-green-400">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
