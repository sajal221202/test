import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  border: 1px solid #ef4444;
  color: #991b1b;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  max-width: 500px;
`;

const RetryButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background: #2563eb;
  }
`;

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    // Log the error for debugging
    console.error("Auth error:", error);
  }, [error]);

  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "You do not have permission to sign in.";
      case "Verification":
        return "The verification token has expired or has already been used.";
      default:
        return "An error occurred during authentication.";
    }
  };

  return (
    <ErrorContainer>
      <h1>Authentication Error</h1>
      <ErrorMessage>{getErrorMessage()}</ErrorMessage>
      <RetryButton onClick={() => router.push("/auth/signin")}>
        Try Again
      </RetryButton>
    </ErrorContainer>
  );
} 