import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const router = useRouter()
    const handleLogOut = async () => {
        const loggedOut = await logoutAccount()
        console.log(loggedOut)
        if (loggedOut) router.push('/sign-in')
    }

    return (
        <footer className="footer">
            <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <p className='text-xl font-bold text-grey-700'>
                    {user ? user?.name[0] : ""}
                </p>
            </div>
            <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
                <h1 className='text-14 truncate text-gray-700 font-semibold'>
                    {user?.name}
                </h1>
                <div className="text-14 truncate text-gray-600">
                    {user?.email}
                </div>
            </div>
            <div className="footer_image" onClick={handleLogOut}>
                <Image
                    src="/icons/logout.svg"
                    fill
                    alt='icon'
                />
            </div>
        </footer>
    )
}

export default Footer