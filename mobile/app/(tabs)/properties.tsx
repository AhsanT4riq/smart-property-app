// mobile/app/(tabs)/properties/index.tsx
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function PropertiesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle">Your Properties</ThemedText>
        {/* We'll add a "+" button here later for adding new properties */}
      </ThemedView>

      <ThemedView style={styles.emptyState}>
        <ThemedText>You don&apos;t have any properties yet.</ThemedText>
        <ThemedText>Add your first property to get started!</ThemedText>
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
