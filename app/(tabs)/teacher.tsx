import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TeacherHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>강사 홈</Text>
      <Text style={styles.text}>
        앞으로 이 화면에서 오늘 수업 목록, 각 반 학생 리스트, 출결 체크,
        학생 메모, 시험 입력 등을 하게 됩니다.
      </Text>
      <Text style={styles.textSub}>
        현재는 역할별 화면 구조만 잡아둔 상태입니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  textSub: {
    fontSize: 14,
    color: "#777",
  },
});
