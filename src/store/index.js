import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  doors: [
    { id: 1, name: "エントランス", status: "online", members: 15, lastSeen: "3分前", location: "本館 1F", critical: false },
    { id: 2, name: "役員室", status: "online", members: 10, lastSeen: "1分前", location: "別棟 2F", critical: true },
    { id: 3, name: "子会社", status: "online", members: 3, lastSeen: "たった今", location: "サテライト", critical: false },
  ],
  members: [
    { id: 1, name: "山田 太郎", email: "yamada@example.co.jp", active: true, pin: "482913", lastUse: "今日 10:21", doors: [1, 2], role: "Admin" },
    { id: 2, name: "佐藤 花子", email: "sato@example.co.jp", active: true, pin: "905741", lastUse: "今日 10:12", doors: [1, 2], role: "Admin" },
    { id: 3, name: "田中 健", email: "tanaka@example.co.jp", active: true, pin: "338204", lastUse: "昨日 18:02", doors: [1, 2, 3], role: "Owner" },
    { id: 4, name: "鈴木 誠", email: "suzuki@example.co.jp", active: false, pin: "------", lastUse: "2026/03/01", doors: [], role: "Admin" },
  ],
  visitors: [
    { id: 1, name: "株式会社ABC 井上様", door: 1, valid: "本日 13:00 - 17:00", status: "issued", code: "QR-VIS-22015" },
    { id: 2, name: "保守業者 佐々木様", door: 3, valid: "本日 09:00 - 11:00", status: "expired", code: "QR-VIS-22010" },
  ],
  logs: [
    { id: 1, at: "2026/03/07 10:21", user: "山田 太郎", door: "エントランス", result: "成功", method: "PIN" },
    { id: 2, at: "2026/03/07 10:12", user: "佐藤 花子", door: "執務室", result: "成功", method: "PIN" },
    { id: 3, at: "2026/03/07 09:55", user: "株式会社ABC 井上様", door: "エントランス", result: "成功", method: "QR" },
    { id: 4, at: "2026/03/07 08:11", user: "不明", door: "子会社", result: "失敗", method: "PIN" },
    { id: 5, at: "2026/03/06 18:02", user: "田中 健", door: "子会社", result: "成功", method: "PIN" },
    { id: 6, at: "2026/03/06 17:42", user: "佐藤 花子", door: "執務室", result: "成功", method: "PIN" },
  ],
  selectedMemberId: 1,
  selectedDoorId: 1,
  memberSearch: "",
  logSearch: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMemberSearch: (state, action) => {
      state.memberSearch = action.payload;
    },
    setLogSearch: (state, action) => {
      state.logSearch = action.payload;
    },
    setSelectedMemberId: (state, action) => {
      state.selectedMemberId = action.payload;
    },
    setSelectedDoorId: (state, action) => {
      state.selectedDoorId = action.payload;
    },
    disableMember: (state, action) => {
      const member = state.members.find(m => m.id === action.payload);
      if (member) {
        member.active = false;
        member.doors = [];
        member.pin = "------";
      }
    },
    regeneratePin: (state, action) => {
      const member = state.members.find(m => m.id === action.payload);
      if (member) {
        member.pin = String(Math.floor(100000 + Math.random() * 900000));
      }
    },
    issueVisitorQr: (state, action) => {
      state.visitors.unshift(action.payload);
    },
  },
});

export const { 
  setMemberSearch, setLogSearch, setSelectedMemberId, 
  setSelectedDoorId, disableMember, regeneratePin, issueVisitorQr 
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
