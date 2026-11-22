// 出典: いすみ議会だより 第1〜84号（第51号・第80号は未入手）の一般質問欄を定例会ごとに集計
// 値 = その任期に一般質問をした定例会の数。null = その任期には在籍していない
window.TERMS = ["2006-10", "2010-14", "2014-18", "2018-22", "2022-26"];
window.MEMBERS = [
  { name: "麻生 実", kana: "あそうみのる", since: "2006年以前", sinceY: 2006, age06: 58, role: "議長", q: [3, 0, 0, 0, 0], note: "議長は慣例として一般質問をしません。" },
  { name: "石川 光男", kana: "いしかわみつお", since: "2006年以前", sinceY: 2006, age06: 64, q: [0, 0, 0, 0, 0] },
  { name: "半場 新一", kana: "はんばしんいち", since: "2006年以前", sinceY: 2006, age06: 54, q: [0, 0, 0, 0, 0], note: "在職35年以上（第84号）。" },
  { name: "井上 栄弌", kana: "いのうええいいち", since: "2006年以前", sinceY: 2006, age06: 64, q: [0, 0, 0, 0, 0] },
  { name: "川嶋 英之", kana: "かわしまひでゆき", since: "2006年以前", sinceY: 2006, age06: 60, q: [1, 0, 0, 0, 0] },
  { name: "田井 秀明", kana: "たいひであき", since: "2006年以前", sinceY: 2006, age06: 44, q: [16, 16, 15, 12, 14], note: "2021年に市長選出馬で失職、2022年に復帰。" },
  { name: "横山 正樹", kana: "よこやままさき", since: "2006年以前", sinceY: 2006, age06: 54, q: [8, 3, 5, 0, 2] },
  { name: "山口 朋子", kana: "やまぐちともこ", since: "2010年", sinceY: 2010, q: [null, 16, 15, 15, 14] },
  { name: "久我 司", kana: "くがつかさ", since: "2013年（補選）", sinceY: 2013, q: [null, 3, 12, 7, 0] },
  { name: "魚地 展弘", kana: "うおちのぶひろ", since: "2017年（補選）", sinceY: 2017, role: "副議長", q: [null, null, 1, 11, 3] },
  { name: "太田 雅彦", kana: "おおたまさひこ", since: "2018年", sinceY: 2018, q: [null, null, null, 8, 7] },
  { name: "元吉 栄一", kana: "もとよしえいいち", since: "2018年", sinceY: 2018, q: [null, null, null, 15, 14] },
  { name: "井上 ひろみ", kana: "いのうえひろみ", since: "2018年", sinceY: 2018, q: [null, null, null, 15, 15] },
  { name: "黒須 美智雄", kana: "くろすみちお", since: "2018年", sinceY: 2018, q: [null, null, null, 8, 9] },
  { name: "高原 和江", kana: "たかはらかずえ", since: "2022年", sinceY: 2022, q: [null, null, null, null, 7], note: "2025年11月に辞職（市長選に出馬）。" },
  { name: "浅野 照久", kana: "あさのてるひさ", since: "2022年", sinceY: 2022, q: [null, null, null, null, 5] },
  { name: "せんだ 雄太", kana: "せんだゆうた", since: "2022年", sinceY: 2022, q: [null, null, null, null, 9] },
  { name: "峰島 正広", kana: "みねしままさひろ", since: "2022年", sinceY: 2022, q: [null, null, null, null, 13] }
];
