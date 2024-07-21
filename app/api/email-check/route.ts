import { NextRequest, NextResponse } from 'next/server'
import tempEmails from './temp-email-list.json'

const checkEmail = (email: string) => {
    const emailRegex = /[^\s@]+@[^\s@]+[^\s@]$/
    if (emailRegex.test(email)) {
        if (tempEmails.includes(email.split('@')[1])) {
            return NextResponse.json({
                status: false,
                message: 'Temp Email'
            })
        }
        return NextResponse.json({
            status: true,
            message: 'Valid Email'
        })
    } else {
        return NextResponse.json({
            status: false,
            message: 'Invalid Email'
        })
    }
}


export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email')
    if (email === null || email === '') {
        return NextResponse.json({
            status: false,
            message: 'Invalid Email'
        })
    }
    return checkEmail(email)
}

export async function POST(req: NextRequest) {
    const email: string = await req.json()
        .then(data => data.email)
    return checkEmail(email)
}