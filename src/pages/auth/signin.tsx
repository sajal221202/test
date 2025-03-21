import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const SignInCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;

  useEffect(() => {
    // If user is already signed in, redirect to callback URL or home
    if (router.isReady) {
      const redirectUrl = callbackUrl as string || "/";
      router.push(redirectUrl);
    }
  }, [router.isReady, callbackUrl]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: callbackUrl as string || "/" });
  };

  return (
    <SignInContainer>
      <SignInCard>
        <h1>Welcome</h1>
        <p>Please sign in to continue</p>
        <GoogleButton onClick={handleGoogleSignIn}>
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width="20"
            height="20"
          />
          Sign in with Google
        </GoogleButton>
      </SignInCard>
    </SignInContainer>
  );
} 