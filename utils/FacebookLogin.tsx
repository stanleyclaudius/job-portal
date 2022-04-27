import { useState, useEffect } from 'react'
import Image from 'next/image'
import facebook from './../public/images/facebook.png'

export interface FacebookLoginProps {
  appId: string
  scope?: string
  fields?: string
  onSuccess: (response: FacebookLoginAuthResponse) => void
  onFailure?: (error: any) => void
  isSignedIn?: boolean
}

export interface FacebookLoginAuthResponse {
  authResponse: {
    accessToken: string
    data_access_expiration_time: number
    expiresIn: number
    graphDomain: string
    signedRequest: string
    userID: string
  }
  status: string
  user?: FacebookLoginUser 
}

export interface FacebookLoginUser  {
  id: string
  email?: string
  name?: string
  first_name?: string
  last_name?: string
  middle_name?: string
  short_name?: string
  picture?: {
    data: {
      height?: number
      is_silhouette?: boolean
      url?: string
      width?: number
    }
  }
}

const FacebookLogin = ({
  appId, 
  scope, 
  fields,
  onSuccess, 
  onFailure, 
  isSignedIn
}: FacebookLoginProps) => {
  const [fbWindow, setFbWindow] = useState<any>()

  const fetchDataFacebook = (response: FacebookLoginAuthResponse) => {
    fbWindow.FB.api('/me', { fields: fields?.split(', ') }, (user: FacebookLoginUser) => {
        onSuccess({user, ...response});
    });
  }

  const statusChangeCallback = (response: FacebookLoginAuthResponse) => {
    if (response.status === 'connected') {
        fetchDataFacebook(response);
    } else if (response.status === 'not_authorized') {
        // @ts-ignore
        onFailure('Import error, Authorize app to import data, error')
    } else {
        // @ts-ignore
        onFailure('Import error, Error occured while importing data, error')
    }
  }

  const facebookLogin = () => {
    fbWindow.FB.login((response: FacebookLoginAuthResponse) => {
        statusChangeCallback(response)
    }, {scope});
  }

  useEffect(() => {
    const script = document.createElement('script')

    script.src = `https://connect.facebook.net/en_US/sdk.js`
    script.async = true
    script.defer = true
    script.crossOrigin="anonymous"

    script.addEventListener('load', () => {
        const { FB }: any = window;
        FB.init({
            appId,
            cookie: true,
            xfbml: true,
            version: 'v10.0'
        })

        setFbWindow(window)       
    })

    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }
  },[appId])

  useEffect(() => {
    if(!isSignedIn || !fbWindow) return;

    fbWindow.FB.getLoginStatus((response: FacebookLoginAuthResponse) => {
        return statusChangeCallback(response)
    });
    // eslint-disable-next-line
  },[isSignedIn, fbWindow])

  return (
    <div id="fb-login" onClick={facebookLogin} className='cursor-pointer w-10'>
      <Image src={facebook} className='rounded-full' />
    </div>
  )
}

FacebookLogin.defaultProps = {
  scope: 'public_profile,email',
  fields: "id,email,first_name,last_name,middle_name,name,picture,short_name",
  height: '50px',
  onSuccess: (response: FacebookLoginAuthResponse) => {
      console.log(response)
  },
  onFailure: (error: any) => {
      console.log(error)
  },
  isSignedIn: false
}

export default FacebookLogin