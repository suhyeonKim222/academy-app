import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type ClassItem = {
  id: string;
  name: string;
  subject: string | null;
  description: string | null;
};

export default function TeacherHomeScreen() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setErrorText(null);
      const { data, error } = await supabase
        .from("classes")
        .select("id, name, subject, description")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Supabase error:", error);
        setErrorText(error.message);
      } else {
        setClasses(data || []);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>반 목록을 불러오는 중...</Text>
      </View>
    );
  }

  if (errorText) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>강사 홈</Text>
        <Text style={styles.errorText}>
          데이터를 불러오는 중 오류가 발생했습니다:
        </Text>
        <Text style={styles.errorText}>{errorText}</Text>
        <Text style={styles.textSub}>
          - Supabase URL / 키가 올바른지
          {"\n"}- classes 테이블이 존재하는지
          {"\n"}- RLS가 꺼져 있는지
          를 확인해 주세요.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>강사 홈</Text>
      <Text style={styles.textSub}>
        아래 목록은 Supabase의 classes 테이블에서 직접 가져온 데이터입니다.
      </Text>

      {classes.length === 0 ? (
        <Text style={styles.emptyText}>등록된 반이 없습니다.</Text>
      ) : (
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.className}>{item.name}</Text>
              <Text style={styles.classSubject}>
                과목: {item.subject || "미지정"}
              </Text>
              {item.description ? (
                <Text style={styles.classDescription}>{item.description}</Text>
              ) : null}
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  textSub: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: "#b00020",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#444",
    marginTop: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    marginBottom: 12,
  },
  className: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  classDescription: {
    fontSize: 14,
    color: "#666",
  },
});
