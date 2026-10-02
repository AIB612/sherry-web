/* 三场联姻专题：飞线 + 短叙事。坐标走 HOUSES，缺省点写在 extra。 */
const EXTRA_NODES = [
  { id: "mukden", name: "盛京", lat: 41.80, lng: 123.43, region: "东亚" },
  { id: "urga", name: "库伦", lat: 47.92, lng: 106.92, region: "东亚" },
  { id: "darmstadt", name: "达姆施塔特", lat: 49.87, lng: 8.65, region: "欧洲" },
  { id: "athens", name: "雅典王室", lat: 37.98, lng: 23.73, region: "欧洲" },
  { id: "coburg", name: "科堡", lat: 50.26, lng: 10.96, region: "欧洲" }
];

const STORIES = [
  {
    id: "habsburg",
    title: "哈布斯堡婚约",
    year: 1550,
    kicker: "Bella gerant alii",
    quote: "让别人打仗吧。你，幸福的奥地利，结婚。",
    blurb: "马克西米利安娶到勃艮第，儿子再娶到卡斯蒂利亚。查理五世醒来时，维也纳、马德里、布鲁塞尔和那不勒斯都在同一张餐桌上。西班牙支系把美洲白银运回欧洲，奥地利支系用下巴和婚约挡住奥斯曼。后来波旁抢走西班牙王冠，哈布斯堡改在多瑙河上经营到 1918 年。",
    focus: [47.2, 8.5],
    zoom: 4,
    globeView: { lat: 47, lng: 12, altitude: 1.7 },
    arcs: [
      { from: "habsburg", to: "bourbon-spain", label: "西班牙支系 → 波旁入主", kind: "继承" },
      { from: "habsburg", to: "bourbon", label: "与凡尔赛对峙兼联姻", kind: "联姻" },
      { from: "habsburg", to: "ottoman", label: "维也纳之围 / 长期对峙", kind: "对峙" },
      { from: "habsburg", to: "byzantium", label: "自称罗马余绪", kind: "正统" },
      { from: "habsburg", to: "romanov", label: "俄奥同盟与巴尔干裂痕", kind: "同盟" },
      { from: "habsburg", to: "hohenzollern", label: "德意志内部的双头鹰与鹰", kind: "对峙" },
      { from: "habsburg", to: "hanover", label: "维多利亚孙辈网络的表亲", kind: "联姻" }
    ]
  },
  {
    id: "manchu-mongol",
    title: "满蒙联姻",
    year: 1650,
    kicker: "从科尔沁到紫禁城",
    quote: "公主北嫁，福晋南来，长城变成一条婚书。",
    blurb: "努尔哈赤起兵时最急需的不是汉臣，是蒙古骑兵和黄金家族的姓。科尔沁博尔济吉特把女儿送到盛京：孝庄辅佐了三代皇帝，海兰珠几乎改写皇太极的宫廷。入关后，满蒙联姻变成制度——公主下嫁外藩，蒙古王公轮流额驸。僧格林沁仍是这条约的晚清回声。",
    focus: [42.5, 118],
    zoom: 5,
    globeView: { lat: 42, lng: 118, altitude: 1.6 },
    arcs: [
      { from: "khorchin", to: "qing", label: "孝庄、海兰珠入宫", kind: "联姻" },
      { from: "khorchin", to: "mongol", label: "哈撒儿后裔 / 黄金家族", kind: "血缘" },
      { from: "qing", to: "mongol", label: "外藩封爵与年班朝觐", kind: "制度" },
      { from: "qing", to: "yuan", label: "继承北元之后的草原秩序", kind: "正统" },
      { from: "qing", to: "joseon", label: "另一条东方宗藩线", kind: "册封" }
    ]
  },
  {
    id: "victoria",
    title: "维多利亚的孙辈",
    year: 1894,
    kicker: "Grandmother of Europe",
    quote: "1914 年开打时，伦敦、柏林、彼得堡的皇帝是表兄弟。",
    blurb: "维多利亚与阿尔伯特的九个孩子被嫁进德意志邦国、丹麦、俄罗斯和地中海。外孙威廉二世戴上德皇冠，外孙女阿丽克斯成为俄国皇后亚历山德拉，孙子乔治五世留在白金汉宫。丹麦的克里斯蒂安九世从另一侧输送新娘。一战不是家族口角，但家族地图能解释：为什么所有人彼此都叫 Cousin。",
    focus: [52.5, 10],
    zoom: 4,
    globeView: { lat: 54, lng: 12, altitude: 1.55 },
    arcs: [
      { from: "hanover", to: "hohenzollern", label: "长女维琪 → 德皇威廉二世", kind: "联姻" },
      { from: "hanover", to: "romanov", label: "外孙女阿丽克斯 → 尼古拉二世", kind: "联姻" },
      { from: "hanover", to: "oldenburg", label: "爱德华七世娶亚历山德拉", kind: "联姻" },
      { from: "oldenburg", to: "romanov", label: "达格玛 → 亚历山大三世 / 尼古拉之母", kind: "联姻" },
      { from: "hanover", to: "bourbon-spain", label: "欧玛公主一线入西班牙", kind: "联姻" },
      { from: "hanover", to: "habsburg", label: "表亲网络的多瑙河一端", kind: "联姻" },
      { from: "hohenzollern", to: "romanov", label: "1914：两个外孙彼此宣战", kind: "对峙" }
    ]
  }
];

const KIND_COLOR = {
  "联姻": "#ffe566",
  "继承": "#ffd84a",
  "对峙": "#f0b429",
  "同盟": "#ffe98a",
  "正统": "#f6d56a",
  "血缘": "#ffe566",
  "制度": "#e6c56a",
  "册封": "#ffd84a",
  "往来": "#ffe98a"
};
