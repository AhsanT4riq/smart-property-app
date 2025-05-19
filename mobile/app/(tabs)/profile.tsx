// mobile/app/(tabs)/profile.tsx
import { useAuth, useUser } from "@clerk/clerk-expo";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.profileHeader}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Account Information</ThemedText>
        <ThemedText>Name: {user?.fullName}</ThemedText>
        <ThemedText>
          Email: {user?.primaryEmailAddress?.emailAddress}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Settings</ThemedText>
        <ThemedText>No settings available yet</ThemedText>
      </ThemedView>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <ThemedText style={styles.signOutButtonText}>Sign Out</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  signOutButton: {
    backgroundColor: "#f44336",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
