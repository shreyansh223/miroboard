'use client';
import { useAuth, ClerkProvider, SignInButton } from '@clerk/nextjs';

import { ConvexProviderWithClerk } from 'convex/react-clerk';
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';

import { Loading } from '@/components/auth/loading';
import HomePage from '@/app/(homepage)/Homepage';

interface ConvexClientProviderProps {
  children: React.ReactNode;
  proceed?: boolean;
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
          <HomePage />
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
