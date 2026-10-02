/* 可展开世系。只收录便于讲述的主干，不是完整家谱。 */
const TREES = {
  qing: {
    houseId: "qing",
    title: "爱新觉罗主干",
    subtitle: "从赫图阿拉到养心殿",
    roots: [{
      name: "努尔哈赤", years: "1559–1626", role: "太祖",
      note: "建州女真的收束者。留下八旗，也留下汗位该传给谁的争端。",
      spouse: "叶赫那拉氏等",
      children: [
        {
          name: "皇太极", years: "1592–1643", role: "太宗",
          note: "改族名为满洲，改国号为清。科尔沁的哲哲与海兰珠进入宫廷。",
          spouse: "孝端文皇后（科尔沁）",
          children: [
            {
              name: "福临", years: "1638–1661", role: "顺治",
              note: "六岁入关。孝庄以皇太后身份把政权从睿亲王手里转成皇帝亲政。",
              spouse: "孝康章皇后",
              children: [
                {
                  name: "玄烨", years: "1654–1722", role: "康熙",
                  note: "平三藩、收台湾、签尼布楚。满蒙联姻在他这一代变成惯例。",
                  spouse: "孝诚仁皇后等",
                  children: [
                    {
                      name: "胤禛", years: "1678–1735", role: "雍正",
                      note: "密折与军机处，把宗室议政换成皇帝办公桌。",
                      children: [
                        {
                          name: "弘历", years: "1711–1799", role: "乾隆",
                          note: "十全老人。版图最大，文字狱与南巡同样醒目。",
                          children: [
                            { name: "颙琰", years: "1760–1820", role: "嘉庆", note: "和珅倒台，白莲教起。帝国开始觉得自己太大。" },
                            { name: "后续至溥仪", years: "1820–1912", role: "道咸同光宣", note: "鸦片战争到辛亥。慈禧在这条线上实际执政数十年。" }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { name: "多尔衮", years: "1612–1650", role: "睿亲王", note: "摄政王。把清带进北京，自己没能成为皇帝。" }
      ]
    }]
  },
  khorchin: {
    houseId: "khorchin",
    title: "科尔沁博尔济吉特",
    subtitle: "送到盛京的黄金家族女儿",
    roots: [{
      name: "莽古斯 / 宰桑一系", years: "16–17 世纪", role: "科尔沁部",
      note: "哈撒儿后裔。决定站在建州这边，而不是察哈尔林丹汗那边。",
      children: [
        { name: "孝端文皇后 哲哲", years: "1599–1649", role: "皇太极皇后", note: "科尔沁的正式联姻。皇后位子本身就是政治文件。" },
        { name: "海兰珠", years: "1609–1641", role: "关雎宫宸妃", note: "皇太极几乎为之改元。早逝，留下满蒙情感政治最个人的一页。" },
        {
          name: "孝庄文皇后 布木布泰", years: "1613–1688", role: "庄妃 → 太后",
          note: "顺治生母、康熙祖母。辅佐三代，是满蒙联姻里影响最大的一个人。",
          children: [
            { name: "顺治", years: "1638–1661", role: "儿子", note: "她把孩子送上北京的位子。" },
            { name: "康熙", years: "1654–1722", role: "孙子", note: "孝庄的政治遗产在孙儿身上开成六十年。" }
          ]
        }
      ]
    }]
  },
  habsburg: {
    houseId: "habsburg",
    title: "哈布斯堡主干",
    subtitle: "结婚比打仗便宜",
    roots: [{
      name: "鲁道夫一世", years: "1218–1291", role: "罗马人民的国王",
      note: "从瑞士哈布斯堡城堡走进德意志王位。",
      children: [
        {
          name: "马克西米利安一世", years: "1459–1519", role: "皇帝",
          note: "娶勃艮第的玛丽，给家族装上尼德兰与法兰西—孔泰。",
          spouse: "勃艮第的玛丽",
          children: [
            {
              name: "腓力美男子", years: "1478–1506", role: "卡斯蒂利亚国王",
              spouse: "胡安娜（疯女）",
              note: "西班牙继承权因此掉进哈布斯堡口袋。",
              children: [
                {
                  name: "查理五世", years: "1500–1558", role: "皇帝兼西班牙国王",
                  note: "日不落的第一版。晚年把奥地利交给弟弟，西班牙交给儿子。",
                  children: [
                    { name: "腓力二世", years: "1527–1598", role: "西班牙支系", note: "无敌舰队、尼德兰叛乱、 Escorial 的书桌国王。" }
                  ]
                },
                {
                  name: "斐迪南一世", years: "1503–1564", role: "奥地利支系",
                  note: "维也纳、波希米亚、匈牙利。这条线活到 1918。",
                  children: [
                    { name: "玛丽亚·特蕾莎", years: "1717–1780", role: "女大公", note: "国事诏书保住家业，把女儿玛丽·安托瓦内特嫁去凡尔赛。" },
                    { name: "弗朗茨·约瑟夫", years: "1830–1916", role: "奥匈皇帝", spouse: "茜茜（伊丽莎白）", note: "1854 年娶巴伐利亚的伊丽莎白。独子梅耶林自杀，妻子日内瓦被刺，侄子死于萨拉热窝。" },
                    { name: "茜茜公主", years: "1837–1898", role: "皇后", spouse: "弗朗茨·约瑟夫", note: "美泉宫公寓、Hermesvilla、科孚阿喀琉斯宫。1898 年日内瓦遇刺。" },
                    { name: "费迪南德·马克西米利安", years: "1832–1867", role: "皇帝之弟", spouse: "卡洛塔", note: "在墨西哥加冕三年，克雷塔罗被枪决。查普尔特佩克与米拉马尔是他的两处家。" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }]
  },
  hanover: {
    houseId: "hanover",
    title: "维多利亚的桌子",
    subtitle: "九个孩子，一张欧洲座位表",
    roots: [{
      name: "维多利亚", years: "1819–1901", role: "英国女王 / 印度女皇",
      spouse: "阿尔伯特（萨克森-科堡-哥达）",
      note: "居丧的祖母。把孩子当作外交文书签发。",
      children: [
        { name: "维多利亚公主", years: "1840–1901", role: "德皇之母", note: "嫁腓特烈三世，生威廉二世。英德亲情在孙子手里断裂。" },
        { name: "爱德华七世", years: "1841–1910", role: "英国国王", note: "娶丹麦亚历山德拉。儿子是乔治五世。" },
        { name: "爱丽丝", years: "1843–1878", role: "黑森大公妃", note: "女儿阿丽克斯后来改名为亚历山德拉·费奥多罗芙娜。" },
        { name: "阿尔弗雷德", years: "1844–1900", role: "爱丁堡公爵", note: "娶俄国亚历山大二世之女。" },
        { name: "海伦娜 / 路易丝 / 亚瑟 / 利奥波德 / 比阿特丽斯", years: "1846–1944", role: "其余子女", note: "分别进入石勒苏益格、加拿大总督、巴滕贝格等支线，把地图补全。" }
      ]
    }]
  },
  romanov: {
    houseId: "romanov",
    title: "罗曼诺夫",
    subtitle: "从克里姆林到冬宫",
    roots: [{
      name: "米哈伊尔", years: "1596–1645", role: "王朝始祖",
      note: "混乱时代后被缙绅会议选出。",
      children: [
        {
          name: "彼得大帝", years: "1672–1725", role: "皇帝",
          note: "把首都搬到沼泽上的欧洲。",
          children: [
            {
              name: "叶卡捷琳娜二世（姻入）", years: "1729–1796", role: "女皇",
              note: "安哈尔特-采尔布斯特的公主，成为帝国本身。",
              children: [
                {
                  name: "亚历山大一世 / 尼古拉一世一线", years: "1777–1855", role: "十九世纪",
                  note: "反拿破仑，再把十二月党人送去西伯利亚。",
                  children: [
                    {
                      name: "亚历山大二世", years: "1818–1881", role: "解放者沙皇",
                      note: "废农奴，死于民意党炸弹。",
                      children: [
                        {
                          name: "亚历山大三世", years: "1845–1894", role: "保守的和平",
                          spouse: "达格玛（玛丽娅·费奥多罗芙娜，丹麦）",
                          children: [
                            { name: "尼古拉二世", years: "1868–1918", role: "末代", spouse: "亚历山德拉（维多利亚外孙女）", note: "日俄战争、一战、叶卡琳堡。表亲网络没有救下他。" }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }]
  },
  tang: {
    houseId: "tang",
    title: "陇西李氏",
    subtitle: "一条姓李的长安",
    roots: [{
      name: "李渊", years: "566–635", role: "高祖",
      note: "太原起兵，把隋的东都和西京换成唐。",
      children: [
        {
          name: "李世民", years: "598–649", role: "太宗",
          note: "玄武门之后的贞观。天可汗是他对草原的自称。",
          children: [
            {
              name: "李治", years: "628–683", role: "高宗",
              spouse: "武则天",
              note: "把朝政逐渐交给皇后。",
              children: [
                { name: "武则天", years: "624–705", role: "周皇帝", note: "唯一正式称帝的女人。李氏中断了十几年，又被自己恢复。" },
                { name: "李隆基", years: "685–762", role: "玄宗", note: "开元到安史。杨氏外戚和藩镇同时坐大。" }
              ]
            }
          ]
        }
      ]
    }]
  },
  ottoman: {
    houseId: "ottoman",
    title: "奥斯曼家族",
    subtitle: "从瑟于特到托普卡帕",
    roots: [{
      name: "奥斯曼一世", years: "1258–1326", role: "始祖",
      note: "安纳托利亚西北角的乌奇首领。",
      children: [
        {
          name: "穆罕默德二世", years: "1432–1481", role: "征服者",
          note: "1453。罗马的城变成伊斯兰的帝都。",
          children: [
            {
              name: "苏莱曼大帝", years: "1494–1566", role: "立法者",
              spouse: "许蕾姆苏丹",
              note: "维也纳、巴格达、罗得岛。宫廷女性政治在这一代公开化。",
              children: [
                { name: "塞利姆二世以降", years: "1566–1922", role: "后期苏丹", note: "后宫摄政、耶尼切里、 Tanzimat，直到 1922 年家族被送出宫廷。" }
              ]
            }
          ]
        }
      ]
    }]
  },
  mughal: {
    houseId: "mughal",
    title: "莫卧儿",
    subtitle: "帖木儿的印度河支系",
    roots: [{
      name: "巴布尔", years: "1483–1530", role: "建国者",
      note: "从费尔干纳输掉家乡，在帕尼帕特赢到北印度。",
      children: [
        {
          name: "阿克巴", years: "1542–1605", role: "大帝",
          note: "拉杰普特联姻、宗教讨论、财政改革。征服被改写成治理。",
          children: [
            {
              name: "贾汉吉尔", years: "1569–1627", role: "皇帝",
              spouse: "努尔·贾汉",
              children: [
                {
                  name: "沙贾汗", years: "1592–1666", role: "泰姬陵的建造者",
                  children: [
                    { name: "奥朗则布", years: "1618–1707", role: "末代强主", note: "把帝国推到最大，也把它推得太满。之后是缓慢的碎裂。" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }]
  },
  tokugawa: {
    houseId: "tokugawa",
    title: "德川氏",
    subtitle: "江户的十五代",
    roots: [{
      name: "德川家康", years: "1543–1616", role: "初代将军",
      note: "三河的耐心。关原之后把天皇留在京都，把权力留在江户。",
      children: [
        { name: "秀忠 → 家光", years: "1579–1651", role: "二代 / 三代", note: "锁国令与参勤交代落地。" },
        { name: "中期诸代", years: "1651–1853", role: "文治幕府", note: "元禄、享保、宽政。武士变穷，城市变密。" },
        { name: "庆喜", years: "1837–1913", role: "第十五代", note: "大政奉还。家族把政权交回天皇家的仪式里。" }
      ]
    }]
  },
  bourbon: {
    houseId: "bourbon",
    title: "波旁",
    subtitle: "纳瓦拉到凡尔赛",
    roots: [{
      name: "亨利四世", years: "1553–1610", role: "开端",
      note: "巴黎值一台弥撒。宗教战争的出口。",
      children: [
        {
          name: "路易十四", years: "1638–1715", role: "太阳王",
          note: "凡尔赛是贵族收容所，也是国家剧院。",
          children: [
            { name: "路易十六", years: "1754–1793", role: "被审判的国王", spouse: "玛丽·安托瓦内特（哈布斯堡）", note: "两家婚约没能挡住革命。" },
            { name: "西班牙波旁", years: "1700–", role: "腓力五世一支", note: "王位继承战争的成果，马德里的同一姓氏。" }
          ]
        }
      ]
    }]
  },
  yamato: {
    houseId: "yamato",
    title: "天皇家",
    subtitle: "符号比政权更长",
    roots: [{
      name: "推古 / 圣德太子", years: "6–7 世纪", role: "飞鸟",
      note: "从氏族王权转向律令国家。",
      children: [
        { name: "桓武", years: "737–806", role: "迁都平安", note: "离开奈良寺院政治。" },
        { name: "藤原摄关时代", years: "10–11 世纪", role: "外戚", note: "天皇家还在，裁决权在岳父手里。" },
        { name: "幕府诸时代", years: "1185–1868", role: "武家政治", note: "源平、足利、德川。王权缩成祭祀。" },
        { name: "明治", years: "1852–1912", role: "倒幕之后", note: "把幕府交回的那套仪式，变成近代天皇制。" }
      ]
    }]
  },
  ming: {
    houseId: "ming",
    title: "朱氏",
    subtitle: "凤阳到煤山",
    roots: [{
      name: "朱元璋", years: "1328–1398", role: "洪武",
      note: "把元朝的都城换成两京制度的起点。",
      children: [
        { name: "朱棣", years: "1360–1424", role: "永乐", note: "靖难、迁都北京、郑和。叔侄相残写成盛世。" },
        { name: "中期诸帝", years: "1424–1620", role: "土木至万历", note: "宦官、内阁、边饷。" },
        { name: "朱由检", years: "1611–1644", role: "崇祯", note: "煤山。家族在南方还续了一阵南明。" }
      ]
    }]
  }
};

const TREE_BY_HOUSE = TREES;
