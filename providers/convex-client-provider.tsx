'use client';
import { useAuth, ClerkProvider } from '@clerk/nextjs';

import { ConvexProviderWithClerk } from 'convex/react-clerk';
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';
import { SignInButton } from '@clerk/nextjs';

import { Loading } from '@/components/auth/loading';
import { Button } from '@/components/ui/button';
interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Unauthenticated>
          <SignInButton mode="modal" />
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};