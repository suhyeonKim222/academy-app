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

type LessonItem = {
  id: string;
  class_id: string;
  start_datetime: string;
  end_datetime: string;
};

export default function TeacherHomeScreen() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorText(null);

      // 1) 반 목록 가져오기
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .select("id, name, subject, description")
        .order("created_at", { ascending: false });

      if (classError) {
        console.log("Supabase classes error:", classError);
        setErrorText(classError.message);
        setLoading(false);
        return;
      }

      setClasses(classData || []);

      // 2) 오늘 수업(lessons) 가져오기
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );

      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("id, class_id, start_datetime, end_datetime")
        .gte("start_datetime", startOfDay.toISOString())
        .lt("start_datetime", endOfDay.toISOString())
        .order("start_datetime", { ascending: true });

      if (lessonError) {
        console.log("Supabase lessons error:", lessonError);
        setErrorText(lessonError.message);
      } else {
        setLessons(lessonData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const getClassName = (classId: string) => {
    const cls = classes.find((c) => c.id === classId);
    return cls ? cls.name : "이름 없는 반";
  };

  const formatTimeRange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const opts: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return `${s.toLocaleTimeString("ko-KR", opts)} ~ ${e.toLocaleTimeString(
      "ko-KR",
      opts
    )}`;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>데이터를 불러오는 중...</Text>
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
          {"\n"}- 필요한 테이블이 모두 생성되었는지
          {"\n"}- lessons / classes 테이블 컬럼 이름이 코드와 일치하는지
          를 확인해 주세요.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>강사 홈</Text>
      <Text style={styles.textSub}>
        아래 목록은 Supabase에서 가져온 반 정보와 오늘 수업 정보입니다.
      </Text>

      {/* 오늘 수업 섹션 */}
      <Text style={styles.sectionTitle}>오늘 수업</Text>
      {lessons.length === 0 ? (
        <Text style={styles.emptyText}>오늘 일정된 수업이 없습니다.</Text>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.lessonCard}>
              <Text style={styles.lessonClassName}>
                {getClassName(item.class_id)}
              </Text>
              <Text style={styles.lessonTime}>
                {formatTimeRange(item.start_datetime, item.end_datetime)}
              </Text>
              {/*
                여기 나중 단계에서:
                - 이 수업을 눌러서 출결 화면으로 이동
                - 출결 상태 요약 보여주기
                등을 추가할 예정
              */}
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* 반 목록 섹션 */}
      <Text style={styles.sectionTitle}>반 목록</Text>
      {classes.length === 0 ? (
        <Text style={styles.emptyText}>등록된 반이 없습니다.</Text>
      ) : (
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.classCard}>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#b00020",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 8,
  },
  lessonCard: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#eef4ff",
    marginBottom: 8,
  },
  lessonClassName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  lessonTime: {
    fontSize: 14,
    color: "#555",
  },
  classCard: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    marginBottom: 8,
  },
  className: {
    fontSize: 16,
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
