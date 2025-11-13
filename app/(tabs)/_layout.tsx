import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      {/* 학원(관리자) 탭 */}
      <Tabs.Screen
        name="index"
        options={{
          title: "학원",
        }}
      />

      {/* 강사 탭 */}
      <Tabs.Screen
        name="teacher"
        options={{
          title: "강사",
        }}
      />

      {/* 학생/학부모 탭 */}
      <Tabs.Screen
        name="student"
        options={{
          title: "학생",
        }}
      />
    </Tabs>
  );
}
