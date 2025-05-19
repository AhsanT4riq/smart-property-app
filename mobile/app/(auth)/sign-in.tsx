// mobile/app/(auth)/sign-in.tsx
import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useGoogleAuth } from "@/lib/auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SignInScreen() {
  const { signInWithGoogle, isLoaded } = useGoogleAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Check if we're already signed in (needed for redirect handling)
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  const handleSignInWithGoogle = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      // The auth state will be handled by the AuthRequiredCheck component
    } catch (err: any) {
      console.error("Error signing in with Google:", err);
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign In",
          headerShown: true,
        }}
      />

      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.logo}>
          Smart Property
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Sign in to manage your properties
        </ThemedText>

        {error ? (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        ) : null}

        <ThemedView style={styles.form}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleSignInWithGoogle}
            disabled={isLoading || !isLoaded}
          >
            <Image
              source={require("../../assets/images/google-logo.png")}
              style={styles.googleIcon}
            />
            <ThemedText style={styles.googleButtonText}>
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#fee2e2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorText: {
    color: "#dc2626",
  },
});
