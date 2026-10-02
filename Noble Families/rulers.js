/* 在位区间。只给能对应到具体年号的领导人。无画像则前端不渲染图。 */
const RULERS = {
  qin: [{ name: "秦始皇", start: -221, end: -210, wiki: "秦始皇" }],
  han: [
    { name: "刘邦", start: -202, end: -195, wiki: "刘邦" },
    { name: "汉武帝", start: -141, end: -87, wiki: "汉武帝" },
    { name: "光武帝", start: 25, end: 57, wiki: "光武帝" }
  ],
  tang: [
    { name: "李渊", start: 618, end: 626, wiki: "唐高祖" },
    { name: "李世民", start: 626, end: 649, wiki: "唐太宗" },
    { name: "武则天", start: 690, end: 705, wiki: "武则天" },
    { name: "唐玄宗", start: 712, end: 756, wiki: "唐玄宗" }
  ],
  song: [
    { name: "赵匡胤", start: 960, end: 976, wiki: "赵匡胤" },
    { name: "宋高宗", start: 1127, end: 1162, wiki: "宋高宗" }
  ],
  yuan: [{ name: "忽必烈", start: 1271, end: 1294, wiki: "忽必烈" }],
  ming: [
    { name: "朱元璋", start: 1368, end: 1398, wiki: "朱元璋" },
    { name: "永乐帝", start: 1402, end: 1424, wiki: "明成祖" },
    { name: "万历帝", start: 1572, end: 1620, wiki: "明神宗" },
    { name: "崇祯", start: 1627, end: 1644, wiki: "崇祯帝" }
  ],
  qing: [
    { name: "皇太极", start: 1626, end: 1643, wiki: "皇太极" },
    { name: "顺治", start: 1643, end: 1661, wiki: "顺治帝" },
    { name: "康熙", start: 1661, end: 1722, wiki: "康熙帝" },
    { name: "雍正", start: 1722, end: 1735, wiki: "雍正帝" },
    { name: "乾隆", start: 1735, end: 1796, wiki: "乾隆帝" },
    { name: "嘉庆", start: 1796, end: 1820, wiki: "嘉庆帝" },
    { name: "道光", start: 1820, end: 1850, wiki: "道光帝" },
    { name: "咸丰", start: 1850, end: 1861, wiki: "咸丰帝" },
    { name: "同治", start: 1861, end: 1875, wiki: "同治帝" },
    { name: "光绪", start: 1875, end: 1908, wiki: "光绪帝" },
    { name: "宣统", start: 1908, end: 1912, wiki: "溥仪" }
  ],
  khorchin: [
    { name: "孝庄文皇后", start: 1636, end: 1688, wiki: "孝庄文皇后" },
    { name: "僧格林沁", start: 1825, end: 1865, wiki: "僧格林沁" }
  ],
  mongol: [
    { name: "成吉思汗", start: 1206, end: 1227, wiki: "成吉思汗" },
    { name: "窝阔台", start: 1229, end: 1241, wiki: "窝阔台" },
    { name: "忽必烈", start: 1260, end: 1294, wiki: "忽必烈" }
  ],
  sui: [
    { name: "杨坚", start: 581, end: 604, wiki: "隋文帝" },
    { name: "杨广", start: 604, end: 618, wiki: "隋炀帝" }
  ],
  wei: [{ name: "曹丕", start: 220, end: 226, wiki: "曹丕" }, { name: "曹操", start: 196, end: 220, wiki: "曹操" }],
  zhou: [{ name: "周武王", start: -1046, end: -1043, wiki: "周武王" }],
  shang: [{ name: "武丁", start: -1250, end: -1192, wiki: "武丁" }, { name: "妇好", start: -1250, end: -1200, wiki: "妇好" }],
  chu: [{ name: "屈原", start: -340, end: -278, wiki: "屈原" }, { name: "楚庄王", start: -613, end: -591, wiki: "楚庄王" }],
  yamato: [
    { name: "推古天皇", start: 592, end: 628, wiki: "推古天皇" },
    { name: "圣德太子", start: 593, end: 622, wiki: "圣德太子" },
    { name: "明治天皇", start: 1867, end: 1912, wiki: "明治天皇" }
  ],
  fujiwara: [{ name: "藤原道长", start: 995, end: 1028, wiki: "藤原道长" }],
  tokugawa: [
    { name: "德川家康", start: 1603, end: 1605, wiki: "德川家康" },
    { name: "德川家光", start: 1623, end: 1651, wiki: "德川家光" },
    { name: "德川庆喜", start: 1866, end: 1868, wiki: "德川庆喜" }
  ],
  ashikaga: [{ name: "足利义满", start: 1368, end: 1394, wiki: "足利义满" }],
  kamakura: [{ name: "源赖朝", start: 1192, end: 1199, wiki: "源赖朝" }],
  toyotomi: [{ name: "丰臣秀吉", start: 1585, end: 1598, wiki: "丰臣秀吉" }],
  joseon: [
    { name: "李成桂", start: 1392, end: 1398, wiki: "李成桂" },
    { name: "世宗", start: 1418, end: 1450, wiki: "朝鲜世宗" }
  ],
  goryeo: [{ name: "王建", start: 918, end: 943, wiki: "王建 (高丽)" }],
  goguryeo: [{ name: "广开土王", start: 391, end: 413, wiki: "好太王" }],
  baekje: [{ name: "近肖古王", start: 346, end: 375, wiki: "近肖古王" }],
  tubo: [{ name: "松赞干布", start: 629, end: 650, wiki: "松赞干布" }, { name: "文成公主", start: 641, end: 680, wiki: "文成公主" }],
  liao: [{ name: "耶律阿保机", start: 907, end: 926, wiki: "耶律阿保机" }, { name: "萧太后", start: 982, end: 1009, wiki: "萧绰" }],
  "jin-jurchen": [{ name: "完颜阿骨打", start: 1115, end: 1123, wiki: "完颜阿骨打" }],
  "xia-west": [{ name: "李元昊", start: 1038, end: 1048, wiki: "李元昊" }],
  "northern-wei": [{ name: "孝文帝", start: 471, end: 499, wiki: "魏孝文帝" }],
  rome: [
    { name: "凯撒", start: -49, end: -44, wiki: "尤利乌斯·凯撒" },
    { name: "奥古斯都", start: -27, end: 14, wiki: "奥古斯都" },
    { name: "图拉真", start: 98, end: 117, wiki: "图拉真" },
    { name: "奥勒留", start: 161, end: 180, wiki: "马可·奥勒留" },
    { name: "君士坦丁", start: 306, end: 337, wiki: "君士坦丁大帝" }
  ],
  byzantium: [
    { name: "查士丁尼", start: 527, end: 565, wiki: "查士丁尼一世" },
    { name: "希拉克略", start: 610, end: 641, wiki: "希拉克略" }
  ],
  macedonia: [{ name: "亚历山大大帝", start: -336, end: -323, wiki: "亚历山大大帝" }, { name: "腓力二世", start: -359, end: -336, wiki: "马其顿的腓力二世" }],
  habsburg: [
    { name: "马克西米利安一世", start: 1493, end: 1519, wiki: "马克西米利安一世 (神圣罗马帝国)" },
    { name: "查理五世", start: 1519, end: 1556, wiki: "查理五世" },
    { name: "玛丽亚·特蕾莎", start: 1740, end: 1780, wiki: "玛丽亚·特蕾莎" },
    { name: "弗朗茨·约瑟夫", start: 1848, end: 1916, wiki: "弗朗茨·约瑟夫一世" },
    { name: "茜茜公主", start: 1854, end: 1898, wiki: "伊丽莎白 (奥地利皇后)" },
    { name: "费迪南德·马克西米利安", start: 1864, end: 1867, wiki: "马克西米连一世 (墨西哥)" }
  ],
  capet: [{ name: "于格·卡佩", start: 987, end: 996, wiki: "于格·卡佩" }, { name: "腓力二世", start: 1180, end: 1223, wiki: "腓力二世 (法兰西)" }],
  plantagenet: [
    { name: "亨利二世", start: 1154, end: 1189, wiki: "亨利二世 (英格兰)" },
    { name: "狮心王理查", start: 1189, end: 1199, wiki: "理查一世 (英格兰)" },
    { name: "约翰王", start: 1199, end: 1216, wiki: "约翰 (英格兰国王)" },
    { name: "爱德华三世", start: 1327, end: 1377, wiki: "爱德华三世" }
  ],
  tudor: [
    { name: "亨利七世", start: 1485, end: 1509, wiki: "亨利七世" },
    { name: "亨利八世", start: 1509, end: 1547, wiki: "亨利八世" },
    { name: "伊丽莎白一世", start: 1558, end: 1603, wiki: "伊丽莎白一世" }
  ],
  stuart: [{ name: "詹姆斯一世", start: 1603, end: 1625, wiki: "詹姆斯一世 (英格兰)" }, { name: "查理一世", start: 1625, end: 1649, wiki: "查理一世 (英格兰)" }],
  bourbon: [
    { name: "亨利四世", start: 1589, end: 1610, wiki: "亨利四世 (法国)" },
    { name: "路易十四", start: 1643, end: 1715, wiki: "路易十四" },
    { name: "路易十六", start: 1774, end: 1792, wiki: "路易十六" }
  ],
  hanover: [
    { name: "乔治三世", start: 1760, end: 1820, wiki: "乔治三世" },
    { name: "维多利亚", start: 1837, end: 1901, wiki: "维多利亚 (英国君主)" }
  ],
  romanov: [
    { name: "彼得大帝", start: 1682, end: 1725, wiki: "彼得大帝" },
    { name: "叶卡捷琳娜二世", start: 1762, end: 1796, wiki: "叶卡捷琳娜二世" },
    { name: "亚历山大二世", start: 1855, end: 1881, wiki: "亚历山大二世" },
    { name: "尼古拉二世", start: 1894, end: 1917, wiki: "尼古拉二世" }
  ],
  hohenzollern: [
    { name: "腓特烈大帝", start: 1740, end: 1786, wiki: "腓特烈二世" },
    { name: "威廉一世", start: 1871, end: 1888, wiki: "威廉一世 (德国)" },
    { name: "威廉二世", start: 1888, end: 1918, wiki: "威廉二世" }
  ],
  oldenburg: [{ name: "克里斯蒂安九世", start: 1863, end: 1906, wiki: "克里斯蒂安九世" }],
  carolingian: [{ name: "查理曼", start: 768, end: 814, wiki: "查理曼" }],
  merovingian: [{ name: "克洛维", start: 481, end: 511, wiki: "克洛维一世" }],
  normandy: [{ name: "征服者威廉", start: 1066, end: 1087, wiki: "威廉一世 (英格兰)" }],
  medici: [{ name: "洛伦佐", start: 1469, end: 1492, wiki: "洛伦佐·德·美第奇" }],
  rurik: [{ name: "伊凡雷帝", start: 1547, end: 1584, wiki: "伊凡四世" }],
  ottoman: [
    { name: "奥斯曼一世", start: 1299, end: 1326, wiki: "奥斯曼一世" },
    { name: "穆罕默德二世", start: 1451, end: 1481, wiki: "穆罕默德二世" },
    { name: "苏莱曼大帝", start: 1520, end: 1566, wiki: "苏莱曼一世 (奥斯曼帝国)" }
  ],
  abbasid: [{ name: "哈伦·拉希德", start: 786, end: 809, wiki: "哈伦·拉希德" }],
  rashidun: [
    { name: "阿布·伯克尔", start: 632, end: 634, wiki: "阿布·伯克尔" },
    { name: "欧麦尔", start: 634, end: 644, wiki: "欧麦尔·本·哈塔卜" },
    { name: "阿里", start: 656, end: 661, wiki: "阿里·本·阿比·塔利卜" }
  ],
  ayyubid: [{ name: "萨拉丁", start: 1171, end: 1193, wiki: "萨拉丁" }],
  achaemenid: [
    { name: "居鲁士大帝", start: -550, end: -530, wiki: "居鲁士二世" },
    { name: "大流士一世", start: -522, end: -486, wiki: "大流士一世" },
    { name: "薛西斯一世", start: -486, end: -465, wiki: "薛西斯一世" }
  ],
  "egypt-nk": [
    { name: "图特摩斯三世", start: -1479, end: -1425, wiki: "图特摩斯三世" },
    { name: "阿肯那顿", start: -1353, end: -1336, wiki: "阿肯那顿" },
    { name: "拉美西斯二世", start: -1279, end: -1213, wiki: "拉美西斯二世" }
  ],
  "egypt-ok": [{ name: "胡夫", start: -2589, end: -2566, wiki: "胡夫" }],
  ptolemy: [{ name: "克娄巴特拉七世", start: -51, end: -30, wiki: "克娄巴特拉七世" }],
  carthage: [{ name: "汉尼拔", start: -221, end: -183, wiki: "汉尼拔" }],
  mughal: [
    { name: "巴布尔", start: 1526, end: 1530, wiki: "巴布尔" },
    { name: "阿克巴", start: 1556, end: 1605, wiki: "阿克巴" },
    { name: "沙贾汗", start: 1628, end: 1658, wiki: "沙贾汉" },
    { name: "奥朗则布", start: 1658, end: 1707, wiki: "奥朗则布" }
  ],
  maurya: [{ name: "阿育王", start: -268, end: -232, wiki: "阿育王" }],
  mali: [{ name: "曼萨·穆萨", start: 1312, end: 1337, wiki: "曼萨·穆萨" }],
  aztec: [{ name: "蒙特苏马二世", start: 1502, end: 1520, wiki: "蒙特苏马二世" }],
  inca: [{ name: "帕查库特克", start: 1438, end: 1471, wiki: "帕查库特克" }, { name: "阿塔瓦尔帕", start: 1532, end: 1533, wiki: "阿塔瓦尔帕" }],
  hawaii: [{ name: "卡美哈梅哈一世", start: 1795, end: 1819, wiki: "卡美哈梅哈一世" }, { name: "利留卡拉尼", start: 1891, end: 1893, wiki: "利留卡拉尼" }],
  rattanakosin: [{ name: "朱拉隆功", start: 1868, end: 1910, wiki: "朱拉隆功" }],
  solomonic: [{ name: "孟尼利克二世", start: 1889, end: 1913, wiki: "孟尼利克二世" }, { name: "海尔·塞拉西", start: 1930, end: 1974, wiki: "海尔·塞拉西一世" }],
  safavid: [{ name: "阿巴斯大帝", start: 1588, end: 1629, wiki: "阿拔斯一世 (波斯)" }],
  timurid: [{ name: "帖木儿", start: 1370, end: 1405, wiki: "帖木儿" }],
  "old-babylon": [{ name: "汉谟拉比", start: -1792, end: -1750, wiki: "汉谟拉比" }],
  babylon: [{ name: "尼布甲尼撒二世", start: -605, end: -562, wiki: "尼布甲尼撒二世" }],
  valois: [{ name: "弗朗索瓦一世", start: 1515, end: 1547, wiki: "弗朗索瓦一世" }],
  castile: [{ name: "伊莎贝拉一世", start: 1474, end: 1504, wiki: "伊莎贝拉一世 (卡斯蒂利亚)" }],
  bagrationi: [{ name: "塔玛丽女王", start: 1184, end: 1213, wiki: "塔玛丽 (格鲁吉亚)" }],
  harsha: [{ name: "戒日王", start: 606, end: 647, wiki: "戒日王" }],
  sikh: [{ name: "兰季特·辛格", start: 1801, end: 1839, wiki: "兰吉特·辛格" }],
  zulu: [{ name: "恰卡", start: 1816, end: 1828, wiki: "恰卡" }],
  ayutthaya: [{ name: "纳黎萱", start: 1590, end: 1605, wiki: "纳黎萱" }],
  hun: [{ name: "阿提拉", start: 434, end: 453, wiki: "阿提拉" }],
  jerusalem: [{ name: "鲍德温四世", start: 1174, end: 1185, wiki: "鲍德温四世" }],
  "qara-khitai": [{ name: "耶律大石", start: 1124, end: 1143, wiki: "耶律大石" }],
  ghaznavid: [{ name: "马哈茂德", start: 998, end: 1030, wiki: "伽色尼的马哈茂德" }],
  qajar: [
    { name: "阿迦·穆罕默德汗", start: 1789, end: 1797, wiki: "阿迦·穆罕默德·汗" },
    { name: "法特赫-阿里沙", start: 1797, end: 1834, wiki: "法特赫-阿里沙" },
    { name: "纳赛尔丁沙", start: 1848, end: 1896, wiki: "纳赛尔丁·沙" }
  ],

  hittite: [{ name: "苏皮卢利乌马一世", start: -1350, end: -1322, wiki: "苏皮卢利乌马一世" }, { name: "穆瓦塔里二世", start: -1295, end: -1272, wiki: "穆瓦塔里二世" }],
  assyria: [{ name: "提格拉特帕拉沙尔三世", start: -745, end: -727, wiki: "提格拉特帕拉沙尔三世" }, { name: "亚述巴尼拔", start: -668, end: -631, wiki: "亚述巴尼拔" }],
  xiongnu: [{ name: "冒顿单于", start: -209, end: -174, wiki: "冒顿单于" }, { name: "老上单于", start: -174, end: -161, wiki: "老上单于" }],
  seleucid: [{ name: "塞琉古一世", start: -312, end: -281, wiki: "塞琉古一世" }, { name: "安条克三世", start: -223, end: -187, wiki: "安条克三世" }],
  parthia: [{ name: "阿尔沙克一世", start: -247, end: -217, wiki: "阿尔沙克一世" }, { name: "米特里达梯二世", start: -124, end: -91, wiki: "米特里达梯二世 (帕提亚)" }],
  sassanid: [{ name: "阿尔达希尔一世", start: 224, end: 242, wiki: "阿尔达希尔一世" }, { name: "霍斯劳一世", start: 531, end: 579, wiki: "库思老一世" }],
  gupta: [{ name: "沙摩陀罗笈多", start: 335, end: 375, wiki: "沙摩陀罗笈多" }, { name: "旃陀罗笈多二世", start: 375, end: 415, wiki: "旃陀罗笈多二世" }],
  aksum: [{ name: "埃扎纳", start: 320, end: 360, wiki: "埃扎纳" }],
  silla: [{ name: "金春秋", start: 654, end: 661, wiki: "金春秋" }],
  umayyad: [{ name: "穆阿维叶", start: 661, end: 680, wiki: "穆阿维叶一世" }, { name: "阿卜杜勒·马利克", start: 685, end: 705, wiki: "阿卜杜勒·马利克" }],
  "umayyad-cordoba": [{ name: "阿卜杜勒·拉赫曼一世", start: 756, end: 788, wiki: "阿卜杜勒·拉赫曼一世" }, { name: "阿卜杜勒·拉赫曼三世", start: 912, end: 961, wiki: "阿卜杜勒·拉赫曼三世" }],
  seljuk: [{ name: "图格里尔", start: 1037, end: 1063, wiki: "图格里勒·贝格" }, { name: "阿尔普·阿尔斯兰", start: 1063, end: 1072, wiki: "阿尔普·阿尔斯兰" }],
  chola: [{ name: "罗阇罗阇一世", start: 985, end: 1014, wiki: "罗阇罗阇一世" }, { name: "罗阇因陀罗一世", start: 1014, end: 1044, wiki: "罗阇因陀罗一世" }],
  angkor: [{ name: "阇耶跋摩七世", start: 1181, end: 1218, wiki: "阇耶跋摩七世" }, { name: "苏利耶跋摩二世", start: 1113, end: 1150, wiki: "苏利耶跋摩二世" }],
  songhai: [{ name: "桑尼·阿里", start: 1464, end: 1492, wiki: "桑尼·阿里" }, { name: "阿斯基亚·穆罕默德", start: 1493, end: 1528, wiki: "阿斯基亚·穆罕默德" }],
  "golden-horde": [{ name: "拔都", start: 1227, end: 1255, wiki: "拔都" }, { name: "乌兹别克汗", start: 1313, end: 1341, wiki: "乌兹别克汗" }],
  ilkhans: [{ name: "旭烈兀", start: 1256, end: 1265, wiki: "旭烈兀" }, { name: "合赞汗", start: 1295, end: 1304, wiki: "合赞" }],
  "bourbon-spain": [{ name: "腓力五世", start: 1700, end: 1746, wiki: "腓力五世 (西班牙)" }, { name: "卡洛斯三世", start: 1759, end: 1788, wiki: "卡洛斯三世" }],
  nguyen: [{ name: "嘉隆帝", start: 1802, end: 1820, wiki: "嘉隆帝" }, { name: "保大帝", start: 1926, end: 1945, wiki: "保大帝" }],
  sumer: [{ name: "乌尔纳姆", start: -2112, end: -2095, wiki: "乌尔纳姆" }, { name: "舒尔吉", start: -2094, end: -2047, wiki: "舒尔吉" }],
  akkad: [{ name: "萨尔贡", start: -2334, end: -2279, wiki: "萨尔贡 (阿卡德)" }, { name: "纳拉姆辛", start: -2254, end: -2218, wiki: "纳拉姆辛" }],
  jin: [{ name: "司马炎", start: 266, end: 290, wiki: "司马炎" }, { name: "司马睿", start: 318, end: 323, wiki: "司马睿" }],
  aviz: [{ name: "若昂一世", start: 1385, end: 1433, wiki: "若昂一世 (葡萄牙)" }, { name: "曼努埃尔一世", start: 1495, end: 1521, wiki: "曼努埃尔一世 (葡萄牙)" }],
  burgundy: [{ name: "大胆腓力", start: 1363, end: 1404, wiki: "大胆腓力" }, { name: "大胆查理", start: 1467, end: 1477, wiki: "大胆查理" }],
  jagiellon: [{ name: "雅盖沃", start: 1386, end: 1434, wiki: "瓦迪斯瓦夫二世·雅盖沃" }, { name: "卡齐米日四世", start: 1447, end: 1492, wiki: "卡齐米日四世" }],
  vasa: [{ name: "古斯塔夫·瓦萨", start: 1523, end: 1560, wiki: "古斯塔夫一世" }, { name: "古斯塔夫·阿道夫", start: 1611, end: 1632, wiki: "古斯塔夫二世·阿道夫" }],
  savoy: [{ name: "埃马努埃莱·菲利贝托", start: 1553, end: 1580, wiki: "埃马努埃莱·菲利贝托" }, { name: "维托里奥·埃马努埃莱二世", start: 1861, end: 1878, wiki: "维托里奥·埃马努埃莱二世" }],
  fatimid: [{ name: "欧拜杜拉", start: 909, end: 934, wiki: "奥贝德拉·马赫迪" }, { name: "穆斯坦西尔", start: 1036, end: 1094, wiki: "穆斯坦西尔" }],
  mamluk: [{ name: "拜巴尔斯", start: 1260, end: 1277, wiki: "拜巴尔斯" }],
  delhi: [{ name: "库特布", start: 1206, end: 1210, wiki: "库特布丁·艾巴克" }, { name: "阿拉丁·卡尔吉", start: 1296, end: 1316, wiki: "阿拉丁·卡尔吉" }],
  pala: [{ name: "达摩波罗", start: 770, end: 810, wiki: "达摩波罗 (波罗王朝)" }],
  srivijaya: [{ name: "巴拉普特拉", start: 850, end: 870, wiki: "巴拉普特拉·德瓦" }],
  vijayanagara: [{ name: "哈里哈拉", start: 1336, end: 1356, wiki: "哈里哈拉一世" }, { name: "克里希那德瓦拉亚", start: 1509, end: 1529, wiki: "克里希那德瓦拉亚" }],
  maratha: [{ name: "西瓦吉", start: 1674, end: 1680, wiki: "西瓦吉" }, { name: "巴吉拉奥", start: 1720, end: 1740, wiki: "巴吉拉奥一世" }],
  ghana: [{ name: "图恩卡·梅宁", start: 1060, end: 1076, wiki: "加纳帝国" }],
  almohad: [{ name: "阿卜杜勒穆明", start: 1130, end: 1163, wiki: "阿卜杜勒穆明" }],
  kongo: [{ name: "阿方索一世", start: 1509, end: 1542, wiki: "阿方索一世 (刚果)" }],
  maya: [{ name: "巴加尔大帝", start: 615, end: 683, wiki: "巴加尔二世" }],
  toltec: [{ name: "托皮尔钦-克察尔科亚特尔", start: 900, end: 947, wiki: "托皮尔钦" }],
  dali: [{ name: "段思平", start: 937, end: 944, wiki: "段思平" }, { name: "段智兴", start: 1172, end: 1200, wiki: "段智兴" }],
  ryukyu: [{ name: "尚巴志", start: 1429, end: 1439, wiki: "尚巴志" }, { name: "尚真", start: 1477, end: 1526, wiki: "尚真" }],
  pagan: [{ name: "阿奴律陀", start: 1044, end: 1077, wiki: "阿奴律陀" }, { name: "江喜陀", start: 1084, end: 1112, wiki: "江喜陀" }],
  majapahit: [{ name: "哈奄·武禄", start: 1350, end: 1389, wiki: "哈奄·武禄" }],
  sukhothai: [{ name: "兰甘亨", start: 1279, end: 1298, wiki: "兰甘亨" }],
  toungoo: [{ name: "莽应龙", start: 1550, end: 1581, wiki: "莽应龙" }],
  lanxang: [{ name: "法昂", start: 1353, end: 1373, wiki: "法昂" }],
  nabataean: [{ name: "阿雷塔斯四世", start: -9, end: 40, wiki: "阿雷塔斯四世" }],
  piast: [{ name: "梅什科一世", start: 960, end: 992, wiki: "梅什科一世" }, { name: "波列斯瓦夫一世", start: 992, end: 1025, wiki: "波列斯瓦夫一世 (波兰)" }],
  arpad: [{ name: "伊什特万一世", start: 1000, end: 1038, wiki: "伊什特万一世" }],
  zimbabwe: [{ name: "马庞古布韦诸王", start: 1100, end: 1270, wiki: "大津巴布韦" }],
  kanem: [{ name: "杜纳马", start: 1221, end: 1259, wiki: "卡奈姆-博尔努帝国" }],
  benin: [{ name: "埃瓦雷大帝", start: 1440, end: 1473, wiki: "埃瓦雷" }, { name: "奥冯拉姆文", start: 1888, end: 1897, wiki: "奥冯拉姆文" }],
  oyo: [{ name: "阿比奥顿", start: 1770, end: 1789, wiki: "奥约帝国" }],
  asante: [{ name: "奥塞·图图", start: 1680, end: 1717, wiki: "奥塞·图图" }],
  wari: [{ name: "瓦里神庙祭司王", start: 600, end: 800, wiki: "瓦里文化" }],
  tiwanaku: [{ name: "太阳门诸王", start: 500, end: 900, wiki: "蒂亚瓦纳科" }],
  purepecha: [{ name: "塔里阿库里", start: 1430, end: 1480, wiki: "塔里阿库里" }],
  muisca: [{ name: "齐帕", start: 1470, end: 1537, wiki: "穆伊斯卡" }],
  teotihuacan: [{ name: "羽蛇神祭司王", start: 150, end: 550, wiki: "特奥蒂瓦坎" }],
  konbaung: [{ name: "雍笈牙", start: 1752, end: 1760, wiki: "雍笈牙" }, { name: "敏东", start: 1853, end: 1878, wiki: "敏东" }],
  "later-le": [{ name: "黎利", start: 1428, end: 1433, wiki: "黎利" }],
  champa: [{ name: "范胡达", start: 1139, end: 1145, wiki: "占婆" }],
  crimean: [{ name: "哈吉·格来", start: 1441, end: 1466, wiki: "哈吉·格来" }],
  dahomey: [{ name: "阿加贾", start: 1718, end: 1740, wiki: "阿加贾" }, { name: "贝汉津", start: 1889, end: 1894, wiki: "贝汉津" }],
  lithuania: [{ name: "格迪米纳斯", start: 1316, end: 1341, wiki: "格迪米纳斯" }, { name: "维陶塔斯", start: 1392, end: 1430, wiki: "维陶塔斯" }],
  bulgaria: [{ name: "阿斯帕鲁赫", start: 681, end: 701, wiki: "阿斯帕鲁赫" }, { name: "西美昂一世", start: 893, end: 927, wiki: "西美昂一世" }],
  khazar: [{ name: "奥巴迪亚", start: 800, end: 825, wiki: "可萨人" }],
  rum: [{ name: "基利杰阿尔斯兰二世", start: 1156, end: 1192, wiki: "基利杰阿尔斯兰二世" }],
  almoravid: [{ name: "优素福·本·塔什芬", start: 1061, end: 1106, wiki: "优素福·本·塔什芬" }],
  funj: [{ name: "阿马拉·东卡", start: 1504, end: 1534, wiki: "芬吉苏丹国" }]

};

function rulerAt(houseId, year) {
  const list = RULERS[houseId] || [];
  return list.find(r => r.start <= year && year <= r.end) || null;
}
function rulersOf(houseId) {
  return RULERS[houseId] || [];
}
