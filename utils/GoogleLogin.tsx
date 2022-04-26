import { useEffect } from 'react'

export interface GoogleLoginProps {
  client_id: string
  scope: string
  longtitle: boolean
  cookiepolicy: string
  height: number 
  theme: string
  onSuccess: (googleUser: GoogleLoginResponse) => void
  onFailure: (error: any) => void
  isSignedIn: boolean
}

export interface GoogleLoginResponse {
  getId(): string;
  isSignedIn(): boolean;
  getBasicProfile(): BasicProfile;
  getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;
}

export interface AuthResponse {
  readonly access_token: string
  readonly id_token: string
  readonly scope: string
  readonly expires_in: number
  readonly first_issued_at: number
  readonly expires_at: number
}

export interface BasicProfile {
  getId(): string
  getName(): string
  getGivenName(): string
  getFamilyName(): string
  getImageUrl(): string
  getEmail(): string
}

export const GoogleLogin = ({
	client_id, 
	scope,
	longtitle,
	cookiepolicy, 
	height, 
	theme, 
	onSuccess, 
	onFailure,
	isSignedIn
}: GoogleLoginProps) => {
	useEffect(() => {
		const script = document.createElement('script');

		script.src = "https://apis.google.com/js/platform.js";
		script.async = true;
		script.defer = true;
		
		script.addEventListener('load', () => {
			const { gapi }: any = window;

			gapi.load('auth2', () => {
					const auth2 = gapi.auth2.init({ 
							client_id ,
							cookiepolicy
					})

					gapi.signin2.render('my-signin2', {
							'scope': scope,
							'height': height,
							'longtitle': longtitle,
							'theme': theme,
							'onsuccess': !auth2.isSignedIn.get() && onSuccess,
							'onfailure': !auth2.isSignedIn.get() && onFailure
					});

					if(!isSignedIn){
							if(auth2.isSignedIn.get()) auth2.signOut()
					}
			})
		});
		
		document.body.appendChild(script);

		return () => {
				document.body.removeChild(script);
		}
	}, [client_id, scope, longtitle, cookiepolicy, theme, height, onSuccess, onFailure, isSignedIn]);

	return (
		<div id="my-signin2" />
	)
}

GoogleLogin.defaultProps = {
	scope: 'profile email',
	longtitle: true,
	height:50, 
	theme:'dark', 
	isSignedIn:false,
	onSuccess: (googleUser: GoogleLoginResponse) => {
			console.log(googleUser)
	},
	onFailure: (error: any) => {
			console.log(error)
	}
}

export default GoogleLogin