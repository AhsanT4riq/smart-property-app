// mobile/app/(tabs)/leases/index.tsx
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LeasesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle">Your Leases</ThemedText>
        {/* We'll add a "+" button here later for adding new leases */}
      </ThemedView>

      <ThemedView style={styles.emptyState}>
        <ThemedText>You don&apos;t have any leases yet.</ThemedText>
        <ThemedText>Leases will appear here once you create them.</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
