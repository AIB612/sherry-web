/* 精选全球帝王 / 王朝 / 贵族世家。年份为约数，用于时间切片可视化，非学术年表。 */
const HOUSES = [
  {
    id: "egypt-nk", name: "埃及新王国", region: "中东", type: "帝国",
    start: -1550, end: -1070, lat: 25.72, lng: 32.60, capital: "底比斯 / 皮拉美西斯",
    people: ["图特摩斯三世", "阿肯那顿", "拉美西斯二世", "奈菲尔提蒂"],
    links: ["hittite", "assyria"],
    blurb: "尼罗河谷最辉煌的法老时代。拉美西斯二世把帝国边界推到叙利亚，神庙刻满自己的名字。王权被说成太阳神在地上的影子。"
  },
  {
    id: "hittite", name: "赫梯帝国", region: "中东", type: "帝国",
    start: -1600, end: -1178, lat: 40.02, lng: 34.43, capital: "哈图沙",
    people: ["苏皮卢利乌马一世", "穆瓦塔里二世"],
    links: ["egypt-nk"],
    blurb: "安纳托利亚高原上的战车强国。卡迭石之战与埃及打成平手，随后签下现存最早的国际和约之一。"
  },
  {
    id: "assyria", name: "新亚述帝国", region: "中东", type: "帝国",
    start: -911, end: -609, lat: 36.36, lng: 43.15, capital: "尼尼微",
    people: ["提格拉特帕拉沙尔三世", "辛那赫里布", "亚述巴尼拔"],
    links: ["achaemenid", "babylon"],
    blurb: "铁器、驿路与恐吓并存的军事机器。亚述巴尼拔的图书馆留下了《吉尔伽美什》泥板，帝国崩得很快，记忆却留下来。"
  },
  {
    id: "babylon", name: "新巴比伦", region: "中东", type: "王朝",
    start: -626, end: -539, lat: 32.54, lng: 44.42, capital: "巴比伦",
    people: ["那波帕拉萨尔", "尼布甲尼撒二世"],
    links: ["assyria", "achaemenid"],
    blurb: "空中花园与伊什塔尔门的都城。尼布甲尼撒二世攻陷耶路撒冷，也把巴比伦建成古代世界最耀眼的都市之一。"
  },
  {
    id: "achaemenid", name: "阿契美尼德波斯", region: "中东", type: "帝国",
    start: -550, end: -330, lat: 29.93, lng: 52.89, capital: "波斯波利斯 / 苏萨",
    people: ["居鲁士大帝", "大流士一世", "薛西斯一世"],
    links: ["macedonia", "maurya"],
    blurb: "从印度河到爱琴海的第一座超大规模帝国。行省、驿道、多种语言并用，居鲁士圆柱被后人称作早期人权文献。"
  },
  {
    id: "zhou", name: "周室", region: "东亚", type: "王朝",
    start: -1046, end: -256, lat: 34.27, lng: 108.95, capital: "丰镐 / 洛邑",
    people: ["周武王", "周公旦", "周平王"],
    links: ["qin", "chu"],
    blurb: "封建与宗法的源头。天子把土地和姓氏封给子弟功臣，春秋以后王权空心化，但“天命”叙事被后来所有中原王朝借用。"
  },
  {
    id: "chu", name: "楚国芈氏", region: "东亚", type: "贵族世家",
    start: -800, end: -223, lat: 30.34, lng: 112.24, capital: "郢都",
    people: ["楚庄王", "屈原", "楚怀王"],
    links: ["zhou", "qin"],
    blurb: "江汉之间的大国世家。芈姓与中原姬姓并立，楚辞、巫风、神树构成另一套华夏想象。被秦灭后，贵族记忆转入汉廷。"
  },
  {
    id: "qin", name: "秦王室", region: "东亚", type: "帝国",
    start: -221, end: -206, lat: 34.38, lng: 108.72, capital: "咸阳",
    people: ["秦孝公", "商鞅", "秦始皇", "李斯"],
    links: ["zhou", "han", "chu"],
    blurb: "用军功爵和度量衡把列国焊成一个国家。短命，但车同轨、书同文、中央集权成了此后两千年的底盘。"
  },
  {
    id: "han", name: "刘氏汉室", region: "东亚", type: "王朝",
    start: -202, end: 220, lat: 34.27, lng: 108.95, capital: "长安 / 洛阳",
    people: ["刘邦", "汉武帝", "霍光", "光武帝"],
    links: ["qin", "xiongnu", "tang"],
    blurb: "汉把秦制熬成可长期运转的帝国。开西域、尊儒术、编史记，让“汉人”成为一个可以走出关中的身份。"
  },
  {
    id: "xiongnu", name: "匈奴挛鞮氏", region: "东亚", type: "帝国",
    start: -209, end: 155, lat: 47.92, lng: 106.92, capital: "龙城（游牧庭帐）",
    people: ["冒顿单于", "老上单于"],
    links: ["han"],
    blurb: "蒙古高原上最早被中原史书认真记录的草原帝国。冒顿的鸣镝与东西部制，是后来突厥、蒙古政治的前奏。"
  },
  {
    id: "macedonia", name: "阿吉德 / 亚历山大帝国", region: "欧洲", type: "帝国",
    start: -336, end: -323, lat: 40.64, lng: 22.94, capital: "佩拉 / 巴比伦",
    people: ["腓力二世", "亚历山大大帝", "奥林匹娅斯"],
    links: ["achaemenid", "ptolemy", "seleucid"],
    blurb: "十年内打穿波斯。帝国随亚历山大的葬礼解体，但他把希腊语、城市和钱币留在了从埃及到中亚的路上。"
  },
  {
    id: "ptolemy", name: "托勒密王朝", region: "中东", type: "王朝",
    start: -305, end: -30, lat: 31.20, lng: 29.92, capital: "亚历山大港",
    people: ["托勒密一世", "克娄巴特拉七世"],
    links: ["macedonia", "rome"],
    blurb: "希腊人统治的埃及。灯塔、图书馆与王室乱伦并存。克娄巴特拉是这个家族最后一位会把埃及当作棋盘的女王。"
  },
  {
    id: "seleucid", name: "塞琉古王朝", region: "中东", type: "王朝",
    start: -312, end: -63, lat: 36.20, lng: 36.16, capital: "安条克",
    people: ["塞琉古一世", "安条克三世"],
    links: ["macedonia", "parthia", "maurya"],
    blurb: "亚历山大部将留下的亚洲王国，一度从爱琴海伸到印度河。帕提亚与罗马从两侧把它撕开。"
  },
  {
    id: "maurya", name: "孔雀王朝", region: "南亚", type: "帝国",
    start: -322, end: -185, lat: 25.60, lng: 85.13, capital: "华氏城",
    people: ["旃陀罗笈多", "阿育王"],
    links: ["seleucid", "gupta"],
    blurb: "南亚第一次真正的泛次大陆帝国。阿育王在石柱上刻下佛法与治理原则，把征服改写成一种道德叙事。"
  },
  {
    id: "rome", name: "尤利乌斯—克劳狄与罗马帝国", region: "欧洲", type: "帝国",
    start: -27, end: 476, lat: 41.89, lng: 12.49, capital: "罗马",
    people: ["凯撒", "奥古斯都", "图拉真", "奥勒留"],
    links: ["ptolemy", "byzantium", "parthia"],
    blurb: "从共和末期的家族斗争长成地中海世界的操作系统。道路、法律、军团和公民权，比任何一座宫殿更持久。"
  },
  {
    id: "parthia", name: "阿尔沙克帕提亚", region: "中东", type: "帝国",
    start: -247, end: 224, lat: 36.19, lng: 59.36, capital: "泰西封 / 尼萨",
    people: ["阿尔沙克一世", "米特里达梯二世"],
    links: ["seleucid", "rome", "sassanid"],
    blurb: "骑射贵族的伊朗帝国，罗马东征最难啃的对手。帕提亚人让丝绸之路在伊朗高原上改走自己的驿站。"
  },
  {
    id: "sassanid", name: "萨珊波斯", region: "中东", type: "帝国",
    start: 224, end: 651, lat: 29.93, lng: 52.89, capital: "泰西封",
    people: ["阿尔达希尔一世", "沙普尔一世", "霍斯劳一世"],
    links: ["parthia", "byzantium", "rashidun"],
    blurb: "自称阿契美尼德继承人的伊朗复兴。琐罗亚斯德教、重骑兵与宫廷仪式影响了后来的伊斯兰与拜占庭礼仪。"
  },
  {
    id: "byzantium", name: "君士坦丁堡的罗马人", region: "欧洲", type: "帝国",
    start: 330, end: 1453, lat: 41.01, lng: 28.98, capital: "君士坦丁堡",
    people: ["君士坦丁", "查士丁尼", "狄奥多拉", "巴列奥略末帝"],
    links: ["rome", "sassanid", "ottoman", "habsburg"],
    blurb: "东罗马把自己活成了一千年。圣索菲亚、希腊火和宫廷礼仪，是中古基督教世界的政治教科书。"
  },
  {
    id: "gupta", name: "笈多王朝", region: "南亚", type: "王朝",
    start: 320, end: 550, lat: 25.32, lng: 83.01, capital: "华氏城 / 优禅尼",
    people: ["旃陀罗笈多二世", "沙摩陀罗笈多"],
    links: ["maurya", "chola"],
    blurb: "古典印度的黄金时代。数学、戏剧、佛寺石窟与梵语宫廷同时开花，影响远到东南亚的王权仪式。"
  },
  {
    id: "aksum", name: "阿克苏姆王国", region: "非洲", type: "帝国",
    start: 100, end: 940, lat: 14.13, lng: 38.72, capital: "阿克苏姆",
    people: ["埃扎纳"],
    links: ["rashidun"],
    blurb: "红海与尼罗河之间的贸易帝国，很早铸造金币，并接受基督教。方尖碑至今还立在高原上。"
  },
  {
    id: "tang", name: "李氏唐朝", region: "东亚", type: "王朝",
    start: 618, end: 907, lat: 34.27, lng: 108.95, capital: "长安",
    people: ["李世民", "武则天", "唐玄宗", "杨贵妃"],
    links: ["han", "yamato", "abbasid", "silla", "tubo", "sui"],
    blurb: "长安是当时的世界城市。科举、诗歌、胡旋舞和西域使团挤在同一条街上。藩镇把盛世从内部拆开。"
  },
  {
    id: "silla", name: "新罗金氏", region: "东亚", type: "王朝",
    start: 668, end: 935, lat: 35.84, lng: 129.22, capital: "庆州",
    people: ["金春秋", "金庾信"],
    links: ["tang", "joseon"],
    blurb: "在唐军协助下统一朝鲜半岛大同江以南。庆州的古坟与佛国寺，是东亚贵族佛教审美的一个高峰。"
  },
  {
    id: "yamato", name: "大和王权 / 天皇家", region: "东亚", type: "王朝",
    start: 300, end: 1868, lat: 34.69, lng: 135.83, capital: "飞鸟 / 奈良 / 京都",
    people: ["推古天皇", "圣德太子", "桓武天皇"],
    links: ["tang", "fujiwara", "tokugawa", "baekje", "kamakura", "ashikaga", "toyotomi"],
    blurb: "世界上延续最久的王室之一。真正的政权多次落到藤原、平氏、源氏和幕府手里，但天皇家作为祭祀与正统的符号几乎从未中断。"
  },
  {
    id: "fujiwara", name: "藤原氏", region: "东亚", type: "贵族世家",
    start: 670, end: 1180, lat: 35.01, lng: 135.77, capital: "京都",
    people: ["藤原不比等", "藤原道长"],
    links: ["yamato"],
    blurb: "靠把女儿送给天皇当皇后来执政。道长时代“此世即吾世”，摄关政治把日本中古变成外戚的黄金世纪。"
  },
  {
    id: "rashidun", name: "正统哈里发", region: "中东", type: "帝国",
    start: 632, end: 661, lat: 24.47, lng: 39.61, capital: "麦地那",
    people: ["阿布·伯克尔", "欧麦尔", "奥斯曼", "阿里"],
    links: ["umayyad", "sassanid"],
    blurb: "先知之后的三十年扩张，推倒萨珊、重创拜占庭。家族与圣门弟子的继承之争，从此写成逊尼与什叶的长线。"
  },
  {
    id: "umayyad", name: "倭马亚王朝", region: "中东", type: "王朝",
    start: 661, end: 750, lat: 33.51, lng: 36.29, capital: "大马士革",
    people: ["穆阿维叶", "阿卜杜勒·马利克"],
    links: ["rashidun", "abbasid", "umayyad-cordoba"],
    blurb: "把哈里发变成世袭王权，行政语言改成阿拉伯语。帝国从中亚伸到伊比利亚，也因此显得过大而脆弱。"
  },
  {
    id: "abbasid", name: "阿拔斯王朝", region: "中东", type: "王朝",
    start: 750, end: 1258, lat: 33.34, lng: 44.40, capital: "巴格达",
    people: ["曼苏尔", "哈伦·拉希德", "马蒙"],
    links: ["umayyad", "tang", "seljuk"],
    blurb: "巴格达智慧宫把希腊、波斯、印度的书译成阿拉伯文。政治上哈里发逐渐被苏丹架空，文化上却定义了伊斯兰黄金时代。"
  },
  {
    id: "umayyad-cordoba", name: "后倭马亚 / 科尔多瓦", region: "欧洲", type: "王朝",
    start: 756, end: 1031, lat: 37.88, lng: -4.78, capital: "科尔多瓦",
    people: ["阿卜杜勒·拉赫曼一世", "阿卜杜勒·拉赫曼三世"],
    links: ["umayyad", "capet"],
    blurb: "逃到伊比利亚的倭马亚王子重建宫廷。科尔多瓦的图书馆、浴室和清真寺，让中古欧洲看见另一种都城密度。"
  },
  {
    id: "carolingian", name: "加洛林王朝", region: "欧洲", type: "王朝",
    start: 751, end: 987, lat: 50.74, lng: 6.08, capital: "亚琛",
    people: ["矮子丕平", "查理曼", "虔诚者路易"],
    links: ["capet", "byzantium"],
    blurb: "查理曼在罗马加冕，把法兰克人的战争机器做成“西欧帝国”的原型。分家传统很快把版图切成日后法、德的轮廓。"
  },
  {
    id: "capet", name: "卡佩王朝", region: "欧洲", type: "王朝",
    start: 987, end: 1328, lat: 48.86, lng: 2.35, capital: "巴黎",
    people: ["于格·卡佩", "腓力二世", "路易九世"],
    links: ["carolingian", "plantagenet", "valois"],
    blurb: "从法兰西岛的小王公长成法国王权。卡佩人靠圣徒形象、巴黎圣母院和细水长流的联姻，把王室变成国家本身。"
  },
  {
    id: "plantagenet", name: "金雀花王朝", region: "欧洲", type: "王朝",
    start: 1154, end: 1485, lat: 51.50, lng: -0.12, capital: "伦敦 / 安茹",
    people: ["亨利二世", "狮心王理查", "约翰王", "爱德华三世"],
    links: ["capet", "tudor"],
    blurb: "安茹帝国横跨英吉利海峡。大宪章、百年战争和玫瑰战争都从这家的餐桌上打出来。"
  },
  {
    id: "seljuk", name: "塞尔柱王朝", region: "中东", type: "帝国",
    start: 1037, end: 1194, lat: 35.68, lng: 51.39, capital: "伊斯法罕 / 巴格达（共治）",
    people: ["图格里尔", "阿尔普·阿尔斯兰", "马利克沙"],
    links: ["abbasid", "ottoman"],
    blurb: "突厥军事贵族接管伊朗与安纳托利亚。曼齐刻尔特一战胜过拜占庭，给后来的奥斯曼打开了大门。"
  },
  {
    id: "chola", name: "朱罗王朝", region: "南亚", type: "帝国",
    start: 848, end: 1279, lat: 10.79, lng: 79.14, capital: "坦贾武尔",
    people: ["罗阇罗阇一世", "罗阇因陀罗一世"],
    links: ["gupta", "angkor"],
    blurb: "泰米尔海上帝国，舰队打到孟加拉和东南亚。湿婆神庙的青铜像与碑铭，是南印度王权最完整的自我画像。"
  },
  {
    id: "angkor", name: "高棉吴哥王朝", region: "南亚", type: "帝国",
    start: 802, end: 1431, lat: 13.41, lng: 103.87, capital: "吴哥",
    people: ["阇耶跋摩二世", "苏利耶跋摩二世", "阇耶跋摩七世"],
    links: ["chola"],
    blurb: "用运河和神庙山重建宇宙。吴哥窟既是毗湿奴的宅邸，也是高棉帝王把稻田帝国写成石头的方式。"
  },
  {
    id: "mali", name: "马里帝国凯塔氏", region: "非洲", type: "帝国",
    start: 1235, end: 1464, lat: 12.65, lng: -8.00, capital: "尼亚尼",
    people: ["松迪亚塔", "曼萨·穆萨"],
    links: ["songhai"],
    blurb: "西非黄金与盐的帝国。曼萨·穆萨朝觐时在开罗撒金，让地中海第一次认真记住尼日尔河上游的王。"
  },
  {
    id: "songhai", name: "桑海帝国", region: "非洲", type: "帝国",
    start: 1464, end: 1591, lat: 16.27, lng: -0.04, capital: "加奥",
    people: ["桑尼·阿里", "阿斯基亚·穆罕默德"],
    links: ["mali"],
    blurb: "从马里手中接过尼日尔河曲。廷巴克图的 Sankore 学园让萨赫勒成为伊斯兰学术的西部枢纽。"
  },
  {
    id: "mongol", name: "孛儿只斤蒙古帝国", region: "东亚", type: "帝国",
    start: 1206, end: 1368, lat: 47.92, lng: 106.92, capital: "哈拉和林 / 大都",
    people: ["成吉思汗", "窝阔台", "忽必烈", "拔都"],
    links: ["yuan", "golden-horde", "ilkhans", "song"],
    blurb: "把欧亚大陆第一次放进同一套驿站。家族很快分成四大汗国，但“黄金家族”的血统在草原政治里用了数百年。"
  },
  {
    id: "song", name: "赵宋", region: "东亚", type: "王朝",
    start: 960, end: 1279, lat: 34.80, lng: 114.31, capital: "开封 / 临安",
    people: ["赵匡胤", "宋高宗", "岳飞", "文天祥"],
    links: ["tang", "mongol", "yuan"],
    blurb: "文官帝国的极致。活字、交子、市舶司和画院，让平民城市第一次压过贵族庄园。军事上输给了草原，文化上赢了后世。"
  },
  {
    id: "yuan", name: "元朝孛儿只斤", region: "东亚", type: "王朝",
    start: 1271, end: 1368, lat: 39.90, lng: 116.40, capital: "大都",
    people: ["忽必烈", "伯颜"],
    links: ["mongol", "ming", "song"],
    blurb: "蒙古人用中原的都城治理中国。运河、站赤和色目人官僚把帝国拼起来，也留下深刻的族群等级记忆。"
  },
  {
    id: "golden-horde", name: "金帐汗国", region: "欧洲", type: "帝国",
    start: 1242, end: 1502, lat: 46.35, lng: 48.04, capital: "萨莱",
    people: ["拔都", "乌兹别克汗"],
    links: ["mongol", "romanov"],
    blurb: "钦察草原上的蒙古—突厥汗国。罗斯诸公向萨莱称臣两个世纪，莫斯科正是在这套秩序里学会集权。"
  },
  {
    id: "ilkhans", name: "伊儿汗国", region: "中东", type: "王朝",
    start: 1256, end: 1335, lat: 37.55, lng: 45.07, capital: "马腊格 / 大不里士",
    people: ["旭烈兀", "合赞汗"],
    links: ["mongol", "abbasid"],
    blurb: "旭烈兀攻陷巴格达，阿拔斯的象征性终结。后来合赞汗改宗伊斯兰，蒙古征服被写进伊朗史的下一章。"
  },
  {
    id: "ming", name: "朱明", region: "东亚", type: "王朝",
    start: 1368, end: 1644, lat: 32.06, lng: 118.80, capital: "南京 / 北京",
    people: ["朱元璋", "永乐帝", "张居正", "崇祯"],
    links: ["yuan", "qing", "joseon"],
    blurb: "里甲、卫所和科举把社会重新钉牢。郑和的船队证明明朝可以出海，海禁又证明它更想把海关在门外。"
  },
  {
    id: "joseon", name: "朝鲜李氏", region: "东亚", type: "王朝",
    start: 1392, end: 1910, lat: 37.57, lng: 126.98, capital: "汉阳",
    people: ["李成桂", "世宗", "赵光祖"],
    links: ["silla", "ming", "qing"],
    blurb: "五百年的儒士王朝。训民正音、实录和书院把王权与士林绑在一起，直到近代被外部秩序打断。"
  },
  {
    id: "timurid", name: "帖木儿帝国", region: "中东", type: "帝国",
    start: 1370, end: 1507, lat: 39.65, lng: 66.96, capital: "撒马尔罕",
    people: ["帖木儿", "沙哈鲁", "乌鲁伯格"],
    links: ["mughal", "safavid", "ottoman"],
    blurb: "自称成吉思汗女婿系统的征服者。撒马尔罕的天文台与瓷砖宫殿，是中亚最后一次把世界当作一张可征的地图。"
  },
  {
    id: "ottoman", name: "奥斯曼王朝", region: "中东", type: "帝国",
    start: 1299, end: 1922, lat: 41.01, lng: 28.98, capital: "布尔萨 / 埃迪尔内 / 伊斯坦布尔",
    people: ["奥斯曼一世", "穆罕默德二世", "苏莱曼大帝", "许蕾姆苏丹"],
    links: ["byzantium", "habsburg", "safavid", "timurid"],
    blurb: "攻下君士坦丁堡的家族。宫廷、耶尼切里和米勒特制度让它同时像罗马、伊斯兰和多民族帝国。一战把它送进博物馆。"
  },
  {
    id: "safavid", name: "萨法维王朝", region: "中东", type: "王朝",
    start: 1501, end: 1736, lat: 32.65, lng: 51.68, capital: "大不里士 / 伊斯法罕",
    people: ["伊斯玛仪一世", "阿巴斯大帝"],
    links: ["ottoman", "mughal", "timurid"],
    blurb: "把十二伊玛目什叶派立为伊朗国教，塑造了现代伊朗的宗教边界。伊斯法罕的广场至今还是这座帝国的客厅。"
  },
  {
    id: "mughal", name: "莫卧儿王朝", region: "南亚", type: "帝国",
    start: 1526, end: 1857, lat: 28.66, lng: 77.24, capital: "阿格拉 / 德里",
    people: ["巴布尔", "阿克巴", "贾汉吉尔", "沙贾汗", "奥朗则布"],
    links: ["timurid", "safavid", "ottoman"],
    blurb: "帖木儿的后裔在印度河—恒河平原建国。阿克巴的宽容与沙贾汗的泰姬陵，是同一家族的两种治理美学。"
  },
  {
    id: "aztec", name: "墨西卡—特诺奇蒂特兰", region: "美洲", type: "帝国",
    start: 1428, end: 1521, lat: 19.43, lng: -99.13, capital: "特诺奇蒂特兰",
    people: ["蒙特苏马一世", "蒙特苏马二世", "奎特拉瓦克"],
    links: ["inca"],
    blurb: "湖上的三重同盟帝国。贡赋、历法与献祭把高原城邦织成一张网，直到西班牙人与天花同时上岸。"
  },
  {
    id: "inca", name: "印加萨帕家族", region: "美洲", type: "帝国",
    start: 1438, end: 1533, lat: -13.52, lng: -71.98, capital: "库斯科",
    people: ["帕查库特克", "瓦伊纳·卡帕克", "阿塔瓦尔帕"],
    links: ["aztec"],
    blurb: "安第斯山的道路与仓储帝国，没有文字却有结绳。王位继承战争刚打完，皮萨罗就到了卡哈马卡。"
  },
  {
    id: "habsburg", name: "哈布斯堡", region: "欧洲", type: "贵族世家",
    start: 1273, end: 1918, lat: 48.21, lng: 16.37, capital: "维也纳 / 马德里",
    people: ["马克西米利安一世", "查理五世", "玛丽亚·特蕾莎", "弗朗茨·约瑟夫", "茜茜公主", "费迪南德·马克西米利安"],
    links: ["ottoman", "bourbon", "romanov", "byzantium", "castile", "burgundy", "medici", "jagiellon", "aviz", "hanover", "hohenzollern", "oldenburg", "savoy", "bourbon-spain", "aztec"],
    blurb: "“让别人打仗，你，幸福的奥地利，结婚吧。”他们用下巴和婚约连接西班牙、尼德兰、匈牙利和神圣罗马帝国，直到一战把双头鹰拆掉。"
  },
  {
    id: "valois", name: "瓦卢瓦王朝", region: "欧洲", type: "王朝",
    start: 1328, end: 1589, lat: 48.86, lng: 2.35, capital: "巴黎",
    people: ["腓力六世", "弗朗索瓦一世", "亨利三世"],
    links: ["capet", "bourbon", "tudor"],
    blurb: "百年战争的法国一方，也是意大利战争里的文艺复兴主顾。家族在宗教战争中燃尽，王位转到波旁旁支。"
  },
  {
    id: "tudor", name: "都铎王朝", region: "欧洲", type: "王朝",
    start: 1485, end: 1603, lat: 51.50, lng: -0.12, capital: "伦敦",
    people: ["亨利七世", "亨利八世", "伊丽莎白一世"],
    links: ["plantagenet", "valois", "stuart"],
    blurb: "玫瑰战争后的新王室。离婚、国教和无敌舰队，让英格兰从边缘岛国变成可以开口说欧洲事务的国家。"
  },
  {
    id: "stuart", name: "斯图亚特王朝", region: "欧洲", type: "王朝",
    start: 1603, end: 1714, lat: 55.95, lng: -3.19, capital: "爱丁堡 / 伦敦",
    people: ["詹姆斯一世", "查理一世", "玛丽二世"],
    links: ["tudor", "hanover"],
    blurb: "苏格兰王室入主英格兰，顺便把君权神授带到断头台边上。光荣革命后，议会高于国王成为不可逆的事实。"
  },
  {
    id: "bourbon", name: "波旁家族", region: "欧洲", type: "王朝",
    start: 1589, end: 1830, lat: 48.80, lng: 2.12, capital: "巴黎 / 凡尔赛",
    people: ["亨利四世", "路易十四", "路易十六"],
    links: ["valois", "habsburg", "bourbon-spain", "hanover", "medici", "savoy"],
    blurb: "太阳王把贵族变成凡尔赛的装饰品。同一套血统在法国革命中被审判，又在西班牙和那不勒斯继续做国王。"
  },
  {
    id: "bourbon-spain", name: "西班牙波旁", region: "欧洲", type: "王朝",
    start: 1700, end: 1931, lat: 40.42, lng: -3.70, capital: "马德里",
    people: ["腓力五世", "卡洛斯三世"],
    links: ["bourbon", "habsburg"],
    blurb: "西班牙王位继承战争的胜出者。美洲白银逐渐枯竭后，这个家族仍在马德里的宫殿里排练欧洲的旧礼仪。"
  },
  {
    id: "romanov", name: "罗曼诺夫", region: "欧洲", type: "王朝",
    start: 1613, end: 1917, lat: 59.94, lng: 30.31, capital: "莫斯科 / 圣彼得堡",
    people: ["彼得大帝", "叶卡捷琳娜二世", "亚历山大二世", "尼古拉二世"],
    links: ["habsburg", "golden-horde", "qing"],
    blurb: "从混乱时代被选出的贵族，把俄国拖进波罗的海和欧洲宫廷。帝国在一战与革命中连根拔起。"
  },
  {
    id: "hanover", name: "汉诺威 / 温莎前身", region: "欧洲", type: "王朝",
    start: 1714, end: 1901, lat: 51.50, lng: -0.12, capital: "伦敦 / 汉诺威",
    people: ["乔治一世", "乔治三世", "维多利亚"],
    links: ["stuart", "habsburg", "romanov", "hohenzollern", "oldenburg"],
    blurb: "德国选帝侯入主英国。维多利亚把孙辈嫁遍欧洲，一战爆发时交战双方有一半是表亲。"
  },
  {
    id: "tokugawa", name: "德川幕府", region: "东亚", type: "贵族世家",
    start: 1603, end: 1868, lat: 35.69, lng: 139.69, capital: "江户",
    people: ["德川家康", "德川家光", "德川庆喜"],
    links: ["yamato", "fujiwara", "qing"],
    blurb: "关原之战后的武家秩序。锁国、参勤交代和士农工商把日本按住了两百五十年，直到黑船到来。"
  },
  {
    id: "qing", name: "爱新觉罗", region: "东亚", type: "王朝",
    start: 1644, end: 1912, lat: 39.92, lng: 116.40, capital: "北京",
    people: ["皇太极", "康熙", "乾隆", "慈禧"],
    links: ["ming", "joseon", "romanov", "tokugawa", "khorchin", "ryukyu", "nguyen"],
    blurb: "从白山黑水入主中原的征服王朝。康乾把版图推到最大，也把人口、考据和宫廷仪式推到饱和。辛亥之后，这个姓还在紫禁城的后院里住了一阵。"
  },
  {
    id: "khorchin", name: "科尔沁博尔济吉特", region: "东亚", type: "贵族世家",
    start: 1206, end: 1912, lat: 43.65, lng: 122.24, capital: "科尔沁（今通辽一带）",
    people: ["孝庄文皇后", "海兰珠", "僧格林沁"],
    links: ["mongol", "qing"],
    blurb: "成吉思汗弟哈撒儿一系。明清之际把女儿反复送进盛京和紫禁城：孝庄、海兰珠、众多福晋。满蒙联姻不是典故，是两百年的制度。"
  },
  {
    id: "hohenzollern", name: "霍亨索伦", region: "欧洲", type: "王朝",
    start: 1701, end: 1918, lat: 52.52, lng: 13.40, capital: "柏林",
    people: ["腓特烈大帝", "威廉一世", "威廉二世"],
    links: ["hanover", "habsburg", "romanov"],
    blurb: "从勃兰登堡选帝侯变成德意志皇帝。威廉二世是维多利亚的外孙，也是把表亲网络炸开的那个人。"
  },
  {
    id: "oldenburg", name: "奥尔登堡 / 丹麦王室", region: "欧洲", type: "王朝",
    start: 1448, end: 1918, lat: 55.68, lng: 12.57, capital: "哥本哈根",
    people: ["克里斯蒂安九世", "亚历山德拉", "达格玛"],
    links: ["hanover", "romanov", "hohenzollern"],
    blurb: "克里斯蒂安九世被称为“欧洲岳父”。女儿分别成为英国王后与俄国皇后，哥本哈根因此变成另一座婚姻交易所。"
  },
  {
    id: "nguyen", name: "阮朝", region: "南亚", type: "王朝",
    start: 1802, end: 1945, lat: 16.47, lng: 107.58, capital: "顺化",
    people: ["嘉隆帝", "明命帝", "保大帝"],
    links: ["qing"],
    blurb: "越南最后的皇朝。顺化的宫禁模仿北京，却要同时面对清廷册封和法国殖民。保大是这个秩序的句号。"
  },
  {
    id: "sumer", name: "乌尔第三王朝", region: "中东", type: "王朝",
    start: -2112, end: -2004, lat: 30.96, lng: 46.10, capital: "乌尔",
    people: ["乌尔纳姆", "舒尔吉"],
    links: ["akkad", "babylon"],
    blurb: "苏美尔的最后一次集权。乌尔纳姆法典比汉谟拉比更早，金字形神塔把王权写成阶梯。"
  },
  {
    id: "akkad", name: "阿卡德帝国", region: "中东", type: "帝国",
    start: -2334, end: -2154, lat: 33.10, lng: 44.10, capital: "阿卡德",
    people: ["萨尔贡", "纳拉姆辛"],
    links: ["sumer", "assyria"],
    blurb: "萨尔贡把彼此打仗的城邦焊成「四方之王」。阿卡德语后来成为近东的外交语。"
  },
  {
    id: "egypt-ok", name: "埃及古王国", region: "中东", type: "帝国",
    start: -2686, end: -2181, lat: 29.98, lng: 31.13, capital: "孟斐斯",
    people: ["左塞尔", "胡夫", "哈夫拉"],
    links: ["egypt-nk"],
    blurb: "金字塔时代。法老不是后来那种征服者，而是把尼罗河的秩序堆成石头的人。"
  },
  {
    id: "shang", name: "商王室", region: "东亚", type: "王朝",
    start: -1600, end: -1046, lat: 36.12, lng: 114.39, capital: "殷",
    people: ["武丁", "妇好", "帝辛"],
    links: ["zhou"],
    blurb: "甲骨上的王朝。妇好既带兵也主持祭祀，殷墟把「王」写成占卜和青铜。"
  },
  {
    id: "carthage", name: "迦太基巴尔卡", region: "非洲", type: "帝国",
    start: -814, end: -146, lat: 36.85, lng: 10.32, capital: "迦太基",
    people: ["哈米尔卡", "汉尼拔"],
    links: ["rome"],
    blurb: "西地中海的商业帝国。汉尼拔翻过阿尔卑斯，罗马用三场战争把它从地图上抹掉。"
  },
  {
    id: "wei", name: "曹魏", region: "东亚", type: "王朝",
    start: 220, end: 266, lat: 34.79, lng: 114.35, capital: "洛阳 / 邺",
    people: ["曹操", "曹丕", "曹植"],
    links: ["han", "jin"],
    blurb: "汉室名存实亡之后的中原政权。屯田与九品中正，把乱世重新编成可以征税的国家。"
  },
  {
    id: "jin", name: "司马晋", region: "东亚", type: "王朝",
    start: 266, end: 420, lat: 34.62, lng: 112.45, capital: "洛阳 / 建康",
    people: ["司马懿", "司马炎", "司马睿"],
    links: ["wei", "sui"],
    blurb: "短暂统一，随即南渡。门阀把皇帝变成士族网络里的一个节点。"
  },
  {
    id: "sui", name: "杨隋", region: "东亚", type: "王朝",
    start: 581, end: 618, lat: 34.27, lng: 108.95, capital: "大兴城",
    people: ["杨坚", "杨广"],
    links: ["jin", "tang"],
    blurb: "再一次把南北焊上。科举雏形和大运河留下了，二世而亡把位子交给李唐。"
  },
  {
    id: "tubo", name: "吐蕃赞普", region: "东亚", type: "帝国",
    start: 618, end: 842, lat: 29.65, lng: 91.14, capital: "逻些",
    people: ["松赞干布", "赤松德赞", "文成公主"],
    links: ["tang"],
    blurb: "高原上的军事与佛教帝国。文成公主入藏是和亲，也是两条驿路的对接。"
  },
  {
    id: "liao", name: "契丹耶律", region: "东亚", type: "王朝",
    start: 907, end: 1125, lat: 42.27, lng: 119.00, capital: "上京临潢",
    people: ["耶律阿保机", "萧太后"],
    links: ["song", "jin-jurchen"],
    blurb: "南北面官：一套治契丹，一套治汉地。澶渊之盟让宋朝学会用岁币买边境。"
  },
  {
    id: "xia-west", name: "党项李夏", region: "东亚", type: "王朝",
    start: 1038, end: 1227, lat: 38.49, lng: 106.23, capital: "兴庆府",
    people: ["李元昊"],
    links: ["song", "mongol"],
    blurb: "贺兰山下的西夏。文字、佛经和骑兵同时存在，最后灭在成吉思汗的回师路上。"
  },
  {
    id: "jin-jurchen", name: "女真完颜", region: "东亚", type: "王朝",
    start: 1115, end: 1234, lat: 45.80, lng: 126.53, capital: "会宁 / 中都",
    people: ["完颜阿骨打", "完颜亮"],
    links: ["liao", "song", "mongol"],
    blurb: "从混同江打到汴京。把辽和北宋先后拆掉，自己又被蒙古和南宋夹灭。"
  },
  {
    id: "goryeo", name: "高丽王氏", region: "东亚", type: "王朝",
    start: 918, end: 1392, lat: 37.97, lng: 126.55, capital: "开京",
    people: ["王建", "姜邯赞"],
    links: ["silla", "liao", "joseon"],
    blurb: "半岛上的佛教王朝。抗过契丹，后来成为蒙古的驸马国，再把位子交给李成桂。"
  },
  {
    id: "ashikaga", name: "足利幕府", region: "东亚", type: "贵族世家",
    start: 1336, end: 1573, lat: 35.01, lng: 135.77, capital: "京都",
    people: ["足利尊氏", "足利义满"],
    links: ["yamato", "tokugawa"],
    blurb: "室町的武家。义满修金阁，也把日本重新接到明朝的册封贸易里。"
  },
  {
    id: "merovingian", name: "墨洛温王朝", region: "欧洲", type: "王朝",
    start: 481, end: 751, lat: 49.89, lng: 3.39, capital: "苏瓦松 / 巴黎",
    people: ["克洛维", "宫相们"],
    links: ["carolingian"],
    blurb: "法兰克人的第一顶王冠。长发国王后来变成宫相手里的圣物，加洛林取而代之。"
  },
  {
    id: "normandy", name: "诺曼底公爵家", region: "欧洲", type: "贵族世家",
    start: 911, end: 1154, lat: 49.18, lng: -0.37, capital: "鲁昂",
    people: ["征服者威廉", "亨利一世"],
    links: ["capet", "plantagenet"],
    blurb: "维京人落地生根。1066 年过海成为英格兰国王，安茹婚姻把它写成金雀花。"
  },
  {
    id: "castile", name: "卡斯蒂利亚特拉斯塔马拉", region: "欧洲", type: "王朝",
    start: 1369, end: 1516, lat: 41.65, lng: -4.72, capital: "巴利亚多利德 / 托莱多",
    people: ["伊莎贝拉一世", "胡安娜"],
    links: ["habsburg", "aviz"],
    blurb: "伊莎贝拉与阿拉贡的斐迪南联姻，西班牙成形。女儿胡安娜把王位带进哈布斯堡。"
  },
  {
    id: "aviz", name: "葡萄牙阿维斯", region: "欧洲", type: "王朝",
    start: 1385, end: 1580, lat: 38.71, lng: -9.14, capital: "里斯本",
    people: ["若昂一世", "恩里克航海王子", "曼努埃尔一世"],
    links: ["castile", "habsburg"],
    blurb: "大航海的王室。印度航线与巴西把里斯本变成大西洋的会计室，王位后来并入西班牙。"
  },
  {
    id: "burgundy", name: "瓦卢瓦-勃艮第", region: "欧洲", type: "贵族世家",
    start: 1363, end: 1477, lat: 47.32, lng: 5.04, capital: "第戎 / 布鲁日",
    people: ["大胆腓力", "大胆查理", "玛丽"],
    links: ["valois", "habsburg"],
    blurb: "几乎自成一国的公爵。玛丽嫁给马克西米利安，尼德兰成为哈布斯堡的嫁妆。"
  },
  {
    id: "medici", name: "美第奇家族", region: "欧洲", type: "贵族世家",
    start: 1434, end: 1737, lat: 43.77, lng: 11.25, capital: "佛罗伦萨",
    people: ["科西莫", "洛伦佐", "凯瑟琳·德·美第奇"],
    links: ["valois", "habsburg"],
    blurb: "银行家变成公爵，女儿变成法兰西王后。文艺复兴的支票簿写在纹章上。"
  },
  {
    id: "rurik", name: "留里克王朝", region: "欧洲", type: "王朝",
    start: 862, end: 1598, lat: 58.52, lng: 31.27, capital: "诺夫哥罗德 / 莫斯科",
    people: ["留里克", "伊凡三世", "伊凡雷帝"],
    links: ["golden-horde", "romanov"],
    blurb: "瓦良格人的罗斯。伊凡三世停止向金帐汗国纳税，伊凡四世自称沙皇，绝嗣后引出罗曼诺夫。"
  },
  {
    id: "jagiellon", name: "雅盖隆王朝", region: "欧洲", type: "王朝",
    start: 1386, end: 1572, lat: 52.23, lng: 21.01, capital: "克拉科夫 / 维尔纽斯",
    people: ["雅盖沃", "卡齐米日四世"],
    links: ["habsburg", "rurik"],
    blurb: "波兰与立陶宛的联合王室。一度挡住条顿骑士团，也把女儿送进哈布斯堡的婚书。"
  },
  {
    id: "vasa", name: "瓦萨王朝", region: "欧洲", type: "王朝",
    start: 1523, end: 1654, lat: 59.33, lng: 18.07, capital: "斯德哥尔摩",
    people: ["古斯塔夫·瓦萨", "古斯塔夫·阿道夫"],
    links: ["habsburg", "hohenzollern"],
    blurb: "瑞典独立与三十年战争里的北欧王冠。瓦萨的战舰和军团让波罗的海变成家族内海。"
  },
  {
    id: "savoy", name: "萨伏依家族", region: "欧洲", type: "王朝",
    start: 1416, end: 1946, lat: 45.07, lng: 7.69, capital: "都灵",
    people: ["埃马努埃莱·菲利贝托", "维托里奥·埃马努埃莱二世"],
    links: ["habsburg", "bourbon"],
    blurb: "阿尔卑斯的门房变成意大利国王。欧洲外交桌上最会换边的家族之一。"
  },
  {
    id: "fatimid", name: "法蒂玛王朝", region: "中东", type: "王朝",
    start: 909, end: 1171, lat: 30.04, lng: 31.24, capital: "马赫迪耶 / 开罗",
    people: ["欧拜杜拉", "穆斯坦西尔"],
    links: ["abbasid", "ayyubid"],
    blurb: "什叶派哈里发在开罗另立中心。爱资哈尔从家族清真寺长成学术机构。"
  },
  {
    id: "ayyubid", name: "阿尤布王朝", region: "中东", type: "王朝",
    start: 1171, end: 1260, lat: 30.04, lng: 31.24, capital: "开罗 / 大马士革",
    people: ["萨拉丁"],
    links: ["fatimid", "mamluk", "plantagenet"],
    blurb: "萨拉丁结束法蒂玛，收回耶路撒冷。库尔德军人家族把圣战写成骑士传奇的另一面。"
  },
  {
    id: "mamluk", name: "马穆鲁克苏丹国", region: "中东", type: "帝国",
    start: 1250, end: 1517, lat: 30.04, lng: 31.24, capital: "开罗",
    people: ["拜巴尔斯", "卡特布加"],
    links: ["ayyubid", "ottoman", "mongol"],
    blurb: "奴隶军官变成苏丹。在阿因扎鲁特挡住蒙古，直到奥斯曼把开罗编进行省。"
  },
  {
    id: "delhi", name: "德里苏丹国", region: "南亚", type: "帝国",
    start: 1206, end: 1526, lat: 28.65, lng: 77.23, capital: "德里",
    people: ["库特布", "阿拉丁·卡尔吉"],
    links: ["mughal", "abbasid"],
    blurb: "突厥—阿富汗军人在北印度轮流坐庄。巴布尔在帕尼帕特把它收进莫卧儿的开场白。"
  },
  {
    id: "pala", name: "波罗王朝", region: "南亚", type: "王朝",
    start: 750, end: 1174, lat: 25.01, lng: 87.84, capital: "超戒 / 摩揭陀",
    people: ["达摩波罗"],
    links: ["chola", "gupta"],
    blurb: "孟加拉—比哈尔的佛教王朝。超戒寺的僧人把密教带去西藏。"
  },
  {
    id: "srivijaya", name: "室利佛逝", region: "南亚", type: "帝国",
    start: 650, end: 1377, lat: -2.99, lng: 104.76, capital: "巴邻旁",
    people: ["巴拉普特拉"],
    links: ["chola", "angkor"],
    blurb: "马六甲海峡的佛教海洋帝国。控制香料与梵文的过路费，直到朱罗舰队来敲门。"
  },
  {
    id: "vijayanagara", name: "毗奢耶那伽罗", region: "南亚", type: "帝国",
    start: 1336, end: 1646, lat: 15.34, lng: 76.46, capital: "汉皮",
    people: ["哈里哈拉", "克里希那德瓦拉亚"],
    links: ["delhi", "mughal"],
    blurb: "南印度抵抗德里苏丹的印度教帝国。汉皮的石车和巴扎今天还在河岸上。"
  },
  {
    id: "maratha", name: "马拉塔联盟", region: "南亚", type: "帝国",
    start: 1674, end: 1818, lat: 18.52, lng: 73.86, capital: "普纳 / 赖加德",
    people: ["西瓦吉", "巴吉拉奥"],
    links: ["mughal"],
    blurb: "从西高止山打出的联盟。把莫卧儿的德干抽空，最后在英国人的条约里解散。"
  },
  {
    id: "ghana", name: "瓦加杜 / 加纳帝国", region: "非洲", type: "帝国",
    start: 300, end: 1200, lat: 15.48, lng: -9.25, capital: "昆比萨利赫",
    people: ["图恩卡·梅宁"],
    links: ["mali"],
    blurb: "萨赫勒最早被阿拉伯地理书认真写下的黄金之王。盐和金在沙漠两端对向行走。"
  },
  {
    id: "almohad", name: "穆瓦希德王朝", region: "非洲", type: "帝国",
    start: 1121, end: 1269, lat: 31.63, lng: -7.99, capital: "马拉喀什",
    people: ["伊本·图马特", "阿卜杜勒穆明"],
    links: ["umayyad-cordoba", "mali"],
    blurb: "阿特拉斯山的改革者王朝。一度同时统治马格里布与安达卢斯，科尔多瓦的余波在此收束。"
  },
  {
    id: "solomonic", name: "所罗门王朝", region: "非洲", type: "王朝",
    start: 1270, end: 1974, lat: 9.03, lng: 38.75, capital: "贡德尔 / 亚的斯亚贝巴",
    people: ["耶库诺·阿姆拉克", "孟尼利克二世", "海尔·塞拉西"],
    links: ["aksum"],
    blurb: "自称示巴与所罗门之后。埃塞俄比亚高原上最长的基督教王统之一。"
  },
  {
    id: "kongo", name: "刚果王国", region: "非洲", type: "王朝",
    start: 1390, end: 1914, lat: -6.27, lng: 14.25, capital: "姆班扎-刚果",
    people: ["恩津加·恩库武", "阿方索一世"],
    links: ["aviz"],
    blurb: "刚果河口的集权王国。阿方索一世与葡萄牙通信、受洗，也看见奴隶贸易把王权掏空。"
  },
  {
    id: "maya", name: "玛雅城邦王统", region: "美洲", type: "王朝",
    start: 250, end: 900, lat: 17.22, lng: -89.62, capital: "蒂卡尔 / 帕伦克",
    people: ["杰斯·卡克", "巴加尔大帝"],
    links: ["toltec", "aztec"],
    blurb: "经典期的神王政治。石碑记录即位、战争与星象，王不是帝国皇帝，而是城邦的轴。"
  },
  {
    id: "toltec", name: "托尔特克", region: "美洲", type: "帝国",
    start: 900, end: 1150, lat: 21.34, lng: -98.96, capital: "图拉",
    people: ["托皮尔钦-克察尔科亚特尔"],
    links: ["maya", "aztec"],
    blurb: "墨西卡后来自称的文明前辈。图拉的战士柱成为高原王权的标准姿态。"
  },
  {
    id: "northern-wei", name: "北魏拓跋 / 元氏", region: "东亚", type: "王朝",
    start: 386, end: 534, lat: 40.08, lng: 113.29, capital: "平城 / 洛阳",
    people: ["拓跋珪", "冯太后", "孝文帝"],
    links: ["jin", "sui"],
    blurb: "鲜卑人的中原王朝。迁洛、改汉姓、均田，把草原政权写成北朝的底本。"
  },
  {
    id: "dali", name: "大理段氏", region: "东亚", type: "王朝",
    start: 937, end: 1253, lat: 25.69, lng: 100.16, capital: "大理",
    people: ["段思平", "段智兴"],
    links: ["song", "mongol"],
    blurb: "洱海边的佛教王国。宋朝把它当作西南的缓冲，忽必烈南下时它成为大理国的句号。"
  },
  {
    id: "ryukyu", name: "琉球尚氏", region: "东亚", type: "王朝",
    start: 1429, end: 1879, lat: 26.22, lng: 127.68, capital: "首里",
    people: ["尚巴志", "尚真"],
    links: ["ming", "qing", "tokugawa"],
    blurb: "同时朝贡明、清与岛津的海岛王统。首里城是东亚朝贡体系里最小也最灵活的宫廷之一。"
  },
  {
    id: "pagan", name: "蒲甘王朝", region: "南亚", type: "王朝",
    start: 849, end: 1297, lat: 21.17, lng: 94.86, capital: "蒲甘",
    people: ["阿奴律陀", "江喜陀"],
    links: ["angkor", "mongol"],
    blurb: "伊洛瓦底江的佛塔森林。阿奴律陀把上座部立成国教，蒙古人到来后蒲甘从都城变成圣地。"
  },
  {
    id: "majapahit", name: "满者伯夷", region: "南亚", type: "帝国",
    start: 1293, end: 1527, lat: -7.55, lng: 112.38, capital: "特罗乌兰",
    people: ["哈奄·武禄", "加查·玛达"],
    links: ["srivijaya", "angkor"],
    blurb: "爪哇的海洋帝国。加查·玛达的誓言要把群岛收进同一张海图。"
  },
  {
    id: "sukhothai", name: "素可泰王朝", region: "南亚", type: "王朝",
    start: 1238, end: 1438, lat: 17.01, lng: 99.82, capital: "素可泰",
    people: ["室利·膺沙罗铁", "兰甘亨"],
    links: ["angkor", "toungoo"],
    blurb: "泰人的第一座都被认真记住的王朝。兰甘亨碑文把王写成能听讼的家长。"
  },
  {
    id: "toungoo", name: "东吁王朝", region: "南亚", type: "帝国",
    start: 1510, end: 1752, lat: 21.97, lng: 96.08, capital: "勃固 / 阿瓦",
    people: ["莽应龙"],
    links: ["sukhothai", "qing"],
    blurb: "缅甸第一次接近统一的火药王朝。曾打到阿瑜陀耶和云南边地。"
  },
  {
    id: "lanxang", name: "澜沧王国", region: "南亚", type: "王朝",
    start: 1353, end: 1707, lat: 19.88, lng: 102.13, capital: "琅勃拉邦",
    people: ["法昂"],
    links: ["angkor", "sukhothai"],
    blurb: "百万大象之国。从吴哥的边缘长成湄公河上游的佛教王统。"
  },
  {
    id: "old-babylon", name: "古巴比伦", region: "中东", type: "王朝",
    start: -1894, end: -1595, lat: 32.54, lng: 44.42, capital: "巴比伦",
    people: ["汉谟拉比"],
    links: ["sumer", "babylon"],
    blurb: "汉谟拉比石碑把王权写成条款。古巴比伦在赫梯一击后碎裂，名字却留下了。"
  },
  {
    id: "nabataean", name: "纳巴泰王国", region: "中东", type: "王朝",
    start: -168, end: 106, lat: 30.33, lng: 35.44, capital: "佩特拉",
    people: ["阿雷塔斯四世"],
    links: ["rome", "ptolemy"],
    blurb: "岩石里的商路王国。香料从阿拉伯半岛走进罗马，佩特拉收取过路费。"
  },
  {
    id: "qajar", name: "卡扎尔王朝", region: "中东", type: "王朝",
    start: 1789, end: 1925, lat: 35.69, lng: 51.39, capital: "德黑兰",
    people: ["阿迦·穆罕默德汗", "纳赛尔丁沙"],
    links: ["ottoman", "romanov", "safavid"],
    blurb: "德黑兰成为伊朗首都的王朝。夹在俄、英之间，把萨法维之后的伊朗重新集权。"
  },
  {
    id: "piast", name: "皮亚斯特王朝", region: "欧洲", type: "王朝",
    start: 960, end: 1370, lat: 52.41, lng: 16.93, capital: "格涅兹诺 / 克拉科夫",
    people: ["梅什科一世", "波列斯瓦夫一世"],
    links: ["jagiellon", "habsburg"],
    blurb: "波兰的开国王朝。受洗、加冕、再把王冠交给安茹与雅盖隆。"
  },
  {
    id: "arpad", name: "阿尔帕德王朝", region: "欧洲", type: "王朝",
    start: 895, end: 1301, lat: 47.50, lng: 19.04, capital: "埃斯泰尔戈姆 / 布达",
    people: ["阿尔帕德", "伊什特万一世"],
    links: ["habsburg", "jagiellon"],
    blurb: "马扎尔人落地为匈牙利。伊什特万的王冠后来成为哈布斯堡婚约里的一件家具。"
  },
  {
    id: "zimbabwe", name: "大津巴布韦", region: "非洲", type: "帝国",
    start: 1220, end: 1450, lat: -20.27, lng: 30.93, capital: "大津巴布韦",
    people: ["马庞古布韦诸王"],
    links: ["mali", "kongo"],
    blurb: "南部非洲的石城政权。黄金走向印度洋，石墙不写字，但写规模。"
  },
  {
    id: "kanem", name: "卡奈姆-博尔努", region: "非洲", type: "帝国",
    start: 700, end: 1376, lat: 13.05, lng: 14.49, capital: "恩吉米",
    people: ["胡迈", "杜纳马"],
    links: ["mali", "ottoman"],
    blurb: "乍得湖的长寿帝国。萨伊夫瓦王朝把跨撒哈拉贸易变成宫廷岁入。"
  },
  {
    id: "benin", name: "贝宁王国", region: "非洲", type: "王朝",
    start: 1180, end: 1897, lat: 6.33, lng: 5.62, capital: "贝宁城",
    people: ["埃瓦雷大帝", "奥冯拉姆文"],
    links: ["oyo", "aviz"],
    blurb: "尼日尔河西岸的奥巴。青铜饰板把宫廷仪仗铸成可以出海的名片。"
  },
  {
    id: "oyo", name: "奥约帝国", region: "非洲", type: "帝国",
    start: 1400, end: 1835, lat: 8.12, lng: 3.42, capital: "奥约-伊莱",
    people: ["奥兰米延", "阿比奥顿"],
    links: ["benin", "asante"],
    blurb: "约鲁巴人的骑兵帝国。阿拉芬与奥约梅西互相限制，是西非少见的制衡宫廷。"
  },
  {
    id: "asante", name: "阿散蒂联盟", region: "非洲", type: "帝国",
    start: 1701, end: 1896, lat: 6.69, lng: -1.62, capital: "库马西",
    people: ["奥塞·图图", "亚阿·阿桑特娃"],
    links: ["oyo", "hanover"],
    blurb: "金凳子上的联盟。黄金海岸的内陆政权，直到英国人把它编进殖民地名录。"
  },
  {
    id: "wari", name: "瓦里", region: "美洲", type: "帝国",
    start: 600, end: 1000, lat: -13.16, lng: -74.22, capital: "瓦里",
    people: ["瓦里神庙祭司王"],
    links: ["tiwanaku", "inca"],
    blurb: "安第斯中部的道路与仓储先行者。印加的许多治理零件，先在瓦里试过一遍。"
  },
  {
    id: "tiwanaku", name: "蒂瓦纳科", region: "美洲", type: "帝国",
    start: 500, end: 1000, lat: -16.55, lng: -68.67, capital: "蒂瓦纳科",
    people: ["太阳门诸王"],
    links: ["wari", "inca"],
    blurb: "的的喀喀湖的礼仪帝国。太阳门朝向高原的历法，被后来的印加认作祖先。"
  },
  {
    id: "purepecha", name: "普雷佩查 / 塔拉斯科", region: "美洲", type: "帝国",
    start: 1300, end: 1530, lat: 19.70, lng: -101.19, capital: "特钦昌",
    people: ["塔里阿库里"],
    links: ["aztec"],
    blurb: "唯一长期挡住墨西卡的高原对手。铜器与湖上都城让它成为另一套墨西哥王权。"
  },
  {
    id: "muisca", name: "穆伊斯卡联盟", region: "美洲", type: "王朝",
    start: 1450, end: 1540, lat: 5.02, lng: -74.00, capital: "巴卡塔 / 洪萨",
    people: ["齐帕", "萨克"],
    links: ["inca"],
    blurb: "波哥大高原的联盟。黄金筏祭礼催生了埃尔多拉多，西班牙人跟着传闻而来。"
  },
  {
    id: "teotihuacan", name: "特奥蒂瓦坎", region: "美洲", type: "帝国",
    start: 100, end: 550, lat: 19.69, lng: -98.85, capital: "特奥蒂瓦坎",
    people: ["羽蛇神祭司王"],
    links: ["maya", "toltec"],
    blurb: "墨西哥谷地的大都会。金字塔对齐星象，玛雅铭文称它的使节为西方来的权贵。"
  },
  {
    id: "hawaii", name: "夏威夷卡美哈梅哈", region: "美洲", type: "王朝",
    start: 1795, end: 1893, lat: 21.31, lng: -157.86, capital: "拉海纳 / 檀香山",
    people: ["卡美哈梅哈一世", "利留卡拉尼"],
    links: ["hanover"],
    blurb: "把群岛焊成一个国家的王朝。利留卡拉尼是这个王统被废前的最后一位女王。"
  },
  {
    id: "rattanakosin", name: "曼谷王朝", region: "南亚", type: "王朝",
    start: 1782, end: 1918, lat: 13.75, lng: 100.49, capital: "曼谷",
    people: ["拉玛一世", "朱拉隆功"],
    links: ["sukhothai", "toungoo"],
    blurb: "却克里家族的曼谷。朱拉隆功改革让暹罗成为东南亚少数没有被直接殖民的王国。"
  },
  {
    id: "konbaung", name: "贡榜王朝", region: "南亚", type: "王朝",
    start: 1752, end: 1885, lat: 21.97, lng: 96.08, capital: "阿瓦 / 曼德勒",
    people: ["雍笈牙", "敏东"],
    links: ["toungoo", "qing"],
    blurb: "缅甸最后一个王朝。三次英缅战争后，王室被送往印度。"
  },
  {
    id: "later-le", name: "后黎朝", region: "南亚", type: "王朝",
    start: 1428, end: 1789, lat: 21.03, lng: 105.84, capital: "东京",
    people: ["黎利"],
    links: ["ming", "nguyen"],
    blurb: "蓝山起义之后的越南王朝。名义上的皇帝，郑阮两家把江山剖成南北。"
  },
  {
    id: "champa", name: "占婆诸王", region: "南亚", type: "王朝",
    start: 192, end: 1832, lat: 13.88, lng: 109.11, capital: "因陀罗补罗 / 毗阇耶",
    people: ["范胡达"],
    links: ["angkor", "later-le"],
    blurb: "中南半岛沿海的印度化王统。与吴哥互攻，最终被越南诸朝吞并。"
  },
  {
    id: "crimean", name: "克里米亚汗国", region: "欧洲", type: "王朝",
    start: 1441, end: 1783, lat: 44.75, lng: 33.86, capital: "巴赫奇萨赖",
    people: ["哈吉·格来"],
    links: ["ottoman", "golden-horde", "romanov"],
    blurb: "金帐汗国的继承者之一。奥斯曼的同盟，直到叶卡捷琳娜把半岛并入俄国。"
  },
  {
    id: "bagrationi", name: "巴格拉季昂王朝", region: "欧洲", type: "王朝",
    start: 813, end: 1810, lat: 41.69, lng: 44.83, capital: "库塔伊西 / 第比利斯",
    people: ["塔玛丽女王"],
    links: ["byzantium", "romanov"],
    blurb: "高加索最长的王室之一。塔玛丽时代被写成黄金世纪，十九世纪并入俄国。"
  },
  {
    id: "goguryeo", name: "高句丽", region: "东亚", type: "王朝",
    start: -37, end: 668, lat: 41.00, lng: 126.21, capital: "国内城 / 平壤",
    people: ["朱蒙", "广开土王"],
    links: ["silla", "tang"],
    blurb: "东北亚的山地王国。广开土王碑把征服写在石头上，668 年灭于唐与新罗。"
  },
  {
    id: "baekje", name: "百济", region: "东亚", type: "王朝",
    start: -18, end: 660, lat: 36.28, lng: 126.91, capital: "慰礼城 / 泗沘",
    people: ["近肖古王"],
    links: ["silla", "yamato"],
    blurb: "半岛西南的王国，把佛教和工匠送去日本。亡于唐罗联军。"
  },
  {
    id: "kamakura", name: "镰仓幕府", region: "东亚", type: "王朝",
    start: 1192, end: 1333, lat: 35.32, lng: 139.55, capital: "镰仓",
    people: ["源赖朝", "北条政子"],
    links: ["yamato", "ashikaga"],
    blurb: "武士政权的开端。源赖朝把将军二字变成一种可以世袭的职务。"
  },
  {
    id: "toyotomi", name: "丰臣氏", region: "东亚", type: "王朝",
    start: 1585, end: 1615, lat: 34.69, lng: 135.53, capital: "大阪",
    people: ["丰臣秀吉"],
    links: ["yamato", "tokugawa"],
    blurb: "农家出身的太阁。统一战国，渡海攻朝鲜，家业在大阪城被德川收掉。"
  },
  {
    id: "harsha", name: "戒日王朝", region: "南亚", type: "帝国",
    start: 606, end: 647, lat: 27.50, lng: 77.68, capital: "曲女城",
    people: ["戒日王"],
    links: ["gupta", "tang"],
    blurb: "笈多之后北印度少有的统一者。玄奘在他的宫廷里看见当时的印度。"
  },
  {
    id: "sikh", name: "锡克帝国", region: "南亚", type: "帝国",
    start: 1799, end: 1849, lat: 31.63, lng: 74.87, capital: "拉合尔",
    people: ["兰季特·辛格"],
    links: ["mughal"],
    blurb: "旁遮普的狮子。兰季特·辛格把米斯尔联盟收成一个国家，直到英印战争。"
  },
  {
    id: "ayutthaya", name: "阿瑜陀耶王朝", region: "南亚", type: "王朝",
    start: 1351, end: 1767, lat: 14.35, lng: 100.57, capital: "阿瑜陀耶",
    people: ["纳黎萱"],
    links: ["sukhothai", "toungoo", "rattanakosin"],
    blurb: "暹罗最长久的都城时代。缅甸军队来过两次，第二次把城烧成废墟。"
  },
  {
    id: "zulu", name: "祖鲁王国", region: "非洲", type: "帝国",
    start: 1816, end: 1879, lat: -28.55, lng: 31.40, capital: "卡瓦布卢瓦约",
    people: ["恰卡", "塞奇瓦约"],
    links: ["asante"],
    blurb: "恰卡重编军团与年龄等级。伊桑德尔瓦纳打赢过英军，王国仍在战争后被拆开。"
  },
  {
    id: "dahomey", name: "达荷美王国", region: "非洲", type: "王朝",
    start: 1600, end: 1904, lat: 7.19, lng: 2.07, capital: "阿波美",
    people: ["阿加贾", "贝汉津"],
    links: ["oyo", "asante"],
    blurb: "贝宁湾内陆的集权王国。女兵团与岁贡是它被欧洲人写下的两张名片。"
  },
  {
    id: "lithuania", name: "格迪米纳斯王朝", region: "欧洲", type: "王朝",
    start: 1316, end: 1572, lat: 54.69, lng: 25.28, capital: "维尔纽斯",
    people: ["格迪米纳斯", "维陶塔斯"],
    links: ["jagiellon", "rurik"],
    blurb: "从波罗的海伸到黑海的大公家族。与波兰联姻后写成雅盖隆。"
  },
  {
    id: "bulgaria", name: "保加利亚第一帝国", region: "欧洲", type: "帝国",
    start: 681, end: 1018, lat: 43.21, lng: 27.92, capital: "普利斯卡 / 普雷斯拉夫",
    people: ["阿斯帕鲁赫", "西美昂一世"],
    links: ["byzantium"],
    blurb: "多瑙河上的第一座保加利亚帝国。西美昂几乎把君士坦丁堡变成邻居的都城。"
  },
  {
    id: "ghaznavid", name: "伽色尼王朝", region: "中东", type: "王朝",
    start: 977, end: 1186, lat: 33.55, lng: 68.42, capital: "加兹尼",
    people: ["马哈茂德"],
    links: ["abbasid", "delhi"],
    blurb: "从呼罗珊打进北印度的突厥王朝。马哈茂德的劫掠被德里苏丹国写成前传。"
  },
  {
    id: "hun", name: "匈奴 / 匈人王庭", region: "欧洲", type: "帝国",
    start: 370, end: 469, lat: 47.16, lng: 19.50, capital: "潘诺尼亚王庭",
    people: ["阿提拉"],
    links: ["rome", "byzantium"],
    blurb: "从草原进入多瑙河的匈人联盟。阿提拉的婚礼与议和，是晚期罗马外交的一场赌博。"
  },
  {
    id: "khazar", name: "可萨汗国", region: "欧洲", type: "帝国",
    start: 650, end: 969, lat: 46.00, lng: 48.00, capital: "伊的尔",
    people: ["布兰", "奥巴迪亚"],
    links: ["byzantium", "abbasid", "rurik"],
    blurb: "伏尔加河口的商业汗国。夹在拜占庭与哈里发之间，部分贵族改宗犹太教。"
  },
  {
    id: "jerusalem", name: "耶路撒冷王国", region: "中东", type: "王朝",
    start: 1099, end: 1291, lat: 31.78, lng: 35.22, capital: "耶路撒冷 / 阿卡",
    people: ["鲍德温四世", "梅丽桑德"],
    links: ["ayyubid", "plantagenet", "capet"],
    blurb: "十字军在圣城立的王。梅丽桑德和麻风王鲍德温的宫廷，靠联姻向欧洲要援军。"
  },
  {
    id: "rum", name: "鲁姆苏丹国", region: "中东", type: "王朝",
    start: 1077, end: 1308, lat: 37.87, lng: 32.49, capital: "科尼亚",
    people: ["基利杰阿尔斯兰二世"],
    links: ["seljuk", "byzantium", "ottoman"],
    blurb: "塞尔柱人在安纳托利亚的分支。科尼亚的石刻与商队，是奥斯曼之前的土耳其化。"
  },
  {
    id: "almoravid", name: "穆拉比特王朝", region: "非洲", type: "帝国",
    start: 1040, end: 1147, lat: 31.63, lng: -7.99, capital: "马拉喀什",
    people: ["优素福·本·塔什芬"],
    links: ["umayyad-cordoba", "almohad"],
    blurb: "从撒哈拉边缘兴起，南下加纳、北上安达卢斯。马拉喀什成为新的都城。"
  },
  {
    id: "qara-khitai", name: "西辽 / 哈剌契丹", region: "中东", type: "王朝",
    start: 1124, end: 1218, lat: 44.31, lng: 80.25, capital: "虎思斡耳朵",
    people: ["耶律大石"],
    links: ["liao", "mongol", "seljuk"],
    blurb: "契丹人西迁后的王朝。耶律大石在中亚重建辽的名号，直到蒙古到来。"
  },
  {
    id: "funj", name: "芬吉苏丹国", region: "非洲", type: "王朝",
    start: 1504, end: 1821, lat: 15.64, lng: 32.48, capital: "森纳尔",
    people: ["阿马拉·东卡"],
    links: ["ottoman", "solomonic"],
    blurb: "青尼罗河上的苏丹国。连接埃塞俄比亚高原与埃及的商路在此收税。"
  }
];
