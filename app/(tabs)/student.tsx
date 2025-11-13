import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StudentHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>학생/학부모 홈</Text>
      <Text style={styles.text}>
        앞으로 이 화면에서 내 수업 일정, 출결 기록, 시험 결과, 공지 등을
        확인하게 됩니다.
      </Text>
      <Text style={styles.textSub}>
        추후 Supabase 연동 후 실제 데이터를 보여주도록 바꿀 예정입니다.
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
