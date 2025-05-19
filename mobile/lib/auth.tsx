import { ClerkProvider, useAuth, useSignIn } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { useRouter, useSegments } from "expo-router";
import { ReactNode, useCallback, useEffect } from "react";
import { Platform } from "react-native";

// Get your Clerk Publishable Key
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Tell WebBrowser to use the current browser tab for web auth
WebBrowser.maybeCompleteAuthSession();

// Token Cache for Clerk using Expo SecureStore
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Failed to get token from cache:", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Failed to save token to cache:", err);
      return;
    }
  },
};

// Hook to use Google OAuth (updated to use current Clerk approach)
export function useGoogleAuth() {
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const signInWithGoogle = useCallback(async () => {
    if (!signInLoaded) return false;

    try {
      // Start the OAuth flow with Google
      const redirectUrl =
        Platform.OS === "web"
          ? window.location.origin
          : "smart-property-mobile://oauth-callback";

      const result = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl,
        redirectUrlComplete: redirectUrl,
      });

      return true;
    } catch (err) {
      console.error("OAuth error", err);
      return false;
    }
  }, [signIn, signInLoaded]);

  return { signInWithGoogle, isLoaded: signInLoaded };
}

// Auth check component to handle protected routes
function AuthRequiredCheck({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    // Check if the current route is in the (auth) group
    const isAuthGroup = segments[0] === "(auth)";

    if (!isSignedIn && !isAuthGroup) {
      // If user is not signed in and not on an auth screen, redirect to sign-in
      router.replace("/sign-in");
    } else if (isSignedIn && isAuthGroup) {
      // If user is signed in but on an auth screen, redirect to home
      router.replace("/");
    }
  }, [isSignedIn, isLoaded, segments, router]);

  return <>{children}</>;
}

// Clerk Provider component to use in _layout.tsx
export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <AuthRequiredCheck>{children}</AuthRequiredCheck>
    </ClerkProvider>
  );
}

// Hook to get the Clerk token (for use with Apollo client)
export async function getAuthToken() {
  return SecureStore.getItemAsync("clerk-session");
}
