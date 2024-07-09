import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useToken } from 'src/lib/auth';

export const config = {
  matcher: [
    '/courses',
    '/course/:path*',
  ],
}

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  // const seshToken = useToken();
  // console.log("where fetch token", seshToken);
  // if (! seshToken ) {
  //   // Respond with JSON indicating an error message
  //   return NextResponse.json(
  //     { success: false, message: 'Need authentication to be here, cowboy' },
  //     { status: 401 }
  //   )
  //   const url = `${process.env.NEXT_PUBLIC_BASE_URL}401`;
  //   return NextResponse.redirect(url);
  // }

}
