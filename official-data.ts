/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { DefaultStall, LocateStall } from './types.ts';

// Raw data from official event site
export const imageBaseUrl = 'https://gj-events.gjs.tw/rakuran/';
export const defaultStalls: DefaultStall[] = [
  // Stalls previously only in user list, added here for coordinate calculation
  { id: 'E18', num: 18, desk: 1, circleImg: '', circleTitle: '鳩米花', links: '' },
  { id: 'E19', num: 19, desk: 1, circleImg: '', circleTitle: '怎麼會中了室町忍者的毒', links: '' },
  { id: 'F01', num: 1, desk: 1, circleImg: '', circleTitle: '忍者小企鵝', links: '' },
  { id: 'F02', num: 2, desk: 1, circleImg: '', circleTitle: 'Border駐台辦事處', links: '' },
  { id: 'F07', num: 7, desk: 1, circleImg: '', circleTitle: '利土＜我們CP打架了＞土尊', links: '' },
  { id: 'F08', num: 8, desk: 1, circleImg: '', circleTitle: 'お兄ちゃんの魚漿工坊', links: '' },
  { id: 'F16', num: 16, desk: 1, circleImg: '', circleTitle: 'U2645', links: '' },
  { id: 'F21', num: 21, desk: 1, circleImg: '', circleTitle: '五穀雜糧XTaCAt', links: '' },

  // Original official list
  { id: 'G01',num:1, circleImg: `${imageBaseUrl}images/pic/GJ33-003182866D.jpg`, circleTitle: '三折肱成良伊', links: 'https://www.plurk.com/g_m_0111' },
  { id: 'G02',num:2, circleImg: `${imageBaseUrl}images/pic/GJ33-000525672B.jpg`, circleTitle: '好吸餅乾', links: 'https://bsky.app/profile/cucki.bsky.social' },
  { id: 'G03',num:3, circleImg: `${imageBaseUrl}images/pic/GJ33-000876030V.jpg`, circleTitle: '中和沒自信大王', links: 'https://www.plurk.com/yuan_yuan_0201' },
  { id: 'G04',num:4, circleImg: `${imageBaseUrl}images/pic/GJ33-001255611W.jpg`, circleTitle: '這世界充滿著愛', links: 'https://www.doujin.com.tw/groups/info/6298/books#groups_tab' },
  { id: 'G05',num:5, circleImg: `${imageBaseUrl}images/pic/GJ33-000204478R.jpg`, circleTitle: '我要睡午覺我很老了', links: 'https://www.plurk.com/kabakab888' },
  { id: 'G06',num:6, circleImg: `${imageBaseUrl}images/pic/GJ33-001197258S.jpg`, circleTitle: '明日之星養成計畫', links: 'https://www.plurk.com/wingdotk' },
  { id: 'G07',num:7, circleImg: `${imageBaseUrl}images/pic/GJ33-004584457Z.jpg`, circleTitle: '忍亂讓我萌生了多餘的情感', links: 'https://www.plurk.com/hypoecho' },
  { id: 'G08',num:8, circleImg: `${imageBaseUrl}images/pic/GJ33-004672033R.jpg`, circleTitle: '改成不破三郎跟鉢屋雷藏就不會搞錯了', links: 'https://www.plurk.com/p/3h4cju05mf' },
  { id: 'G09',num:9, circleImg: `${imageBaseUrl}images/pic/GJ33-005577275R.jpg`, circleTitle: '長一樣只是因為太喜歡人家了是否搞錯了什麼', links: 'https://x.com/ChaNYiNin' },
  { id: 'G10',num:10, circleImg: `${imageBaseUrl}images/pic/GJ33-005460430M.jpg`, circleTitle: 'KOO', links: 'https://x.com/kooooooonokoo' },
  { id: 'G11',num:11, circleImg: `${imageBaseUrl}images/pic/GJ33-001226420U.jpg`, circleTitle: '六年ろ組の食卓の段', links: 'https://www.doujin.com.tw/authors/info/kuramatsu' },
  { id: 'G12',num:12, circleImg: `${imageBaseUrl}images/pic/GJ33-000554840U.jpg`, circleTitle: '兩個人的羈絆', links: 'https://www.plurk.com/aaalisatw' },
  { id: 'G13',num:13, circleImg: `${imageBaseUrl}images/pic/GJ33-004905679V.jpg`, circleTitle: '純子在哪裡', links: 'https://www.plurk.com/ccdsjz851' },
  { id: 'G14',num:14, circleImg: `${imageBaseUrl}images/pic/GJ33-005256018S.jpg`, circleTitle: '衝呀咚咚隆咚鏘', links: 'https://x.com/jbaceispotato' },
  { id: 'G15',num:15, circleImg: `${imageBaseUrl}images/pic/GJ33-000350418B.jpg`, circleTitle: '這裡有小忍者～要吸一口嗎？', links: 'https://www.plurk.com/alphard0872' },
  { id: 'G16',num:16, circleImg: `${imageBaseUrl}images/pic/GJ33-002014858T.jpg`, circleTitle: '喜得天助', links: 'https://www.doujin.com.tw/groups/info/8860' },
  { id: 'G17',num:17, circleImg: `${imageBaseUrl}images/pic/GJ33-001722805H.jpg`, circleTitle: '你忍一下', links: 'https://www.facebook.com/profile.php?id=100006602762046' },
  { id: 'G18',num:18, circleImg: `${imageBaseUrl}images/pic/GJ33-004818082O.jpg`, circleTitle: '忍豹部隊', links: 'https://www.doujin.com.tw/authors/info/mimijian' },
  { id: 'G19',num:19, circleImg: `${imageBaseUrl}images/pic/GJ33-000321239X.jpg`, circleTitle: '◆HANEKU◆', links: 'https://www.plurk.com/hane_0928' },
  { id: 'G20',num:20, circleImg: `${imageBaseUrl}images/pic/GJ33-004263284V.jpg`, circleTitle: '豆腐本舖', links: 'https://www.plurk.com/chi1522' },
  { id: 'G21',num:21, circleImg: `${imageBaseUrl}images/pic/GJ33-005431272I.jpg`, circleTitle: '草莓香菸', links: 'https://www.plurk.com/usanana' },
  { id: 'G22',num:22, circleImg: `${imageBaseUrl}images/pic/GJ33-002803224D.jpg`, circleTitle: '被被村', links: 'https://www.plurk.com/nunoasuka' },
  { id: 'G23',num:23, circleImg: `${imageBaseUrl}images/pic/GJ33-002190061Z.jpg`, circleTitle: '室町cafe幸運食堂', links: 'https://www.plurk.com/H2Two' },
  { id: 'G24',num:24, circleImg: `${imageBaseUrl}images/pic/GJ33-004934872J.jpg`, circleTitle: '321年齡逆轉推廣委員會', links: 'https://www.plurk.com/yifeng424' },
  { id: 'G25',num:25, circleImg: `${imageBaseUrl}images/pic/GJ33-002306868G.jpg`, circleTitle: '室町人都玩這麼開的嗎', links: 'https://www.plurk.com/HIKARI18' },
  { id: 'G26',num:26, circleImg: `${imageBaseUrl}images/pic/GJ33-004613671J.jpg`, circleTitle: '室町ATM', links: 'https://www.plurk.com/shun19' },
  { id: 'H01',num:1, circleImg: `${imageBaseUrl}images/pic/GJ33-004350841H.jpg`, circleTitle: '剪紙舍', links: 'https://www.plurk.com/hulurd' },
  { id: 'H02',num:2, circleImg: `${imageBaseUrl}images/pic/GJ33-003036884M.jpg`, circleTitle: '白享瓜的小王國', links: 'https://www.plurk.com/ownownking' },
  { id: 'H03',num:3, circleImg: `${imageBaseUrl}images/pic/GJ33-003095296D.jpg`, circleTitle: '日日是好日', links: 'https://www.plurk.com/F_ks' },
  { id: 'H04',num:4, circleImg: `${imageBaseUrl}images/pic/GJ33-004321691L.jpg`, circleTitle: 'Finnish', links: 'https://www.plurk.com/finn94119' },
  { id: 'H05',num:5, circleImg: `${imageBaseUrl}images/pic/GJ33-001518410H.jpg`, circleTitle: '你看起來好好吃', links: 'https://x.com/ryokohu1129' },
  { id: 'H06',num:6, circleImg: `${imageBaseUrl}images/pic/GJ33-000992837D.jpg`, circleTitle: '黑鮪食堂', links: 'https://www.facebook.com/blacktuna' },
  { id: 'H07',num:7, circleImg: `${imageBaseUrl}images/pic/GJ33-001022008U.jpg`, circleTitle: '雲林鹹蛋珍奶藏人', links: 'https://x.com/shibaebi_info' },
  { id: 'H08',num:8, circleImg: `${imageBaseUrl}images/pic/GJ33-001138874F.jpg`, circleTitle: '烤的剛好的麵包', links: 'https://www.plurk.com/p/3h5mqxa5va' },
  { id: 'H09',num:9, circleImg: `${imageBaseUrl}images/pic/GJ33-004526026X.jpg`, circleTitle: '迷子食堂', links: 'https://www.plurk.com/cat111627' },
  { id: 'H10',num:10, circleImg: `${imageBaseUrl}images/pic/GJ33-004555244D.jpg`, circleTitle: '忍犬學園', links: 'https://www.plurk.com/kuanyuyu'},
  { id: 'H11',num:11, circleImg: `${imageBaseUrl}images/pic/GJ33-004701260D.jpg`, circleTitle: '獵兔腳不運骨', links: 'https://www.plurk.com/minziaa' },
  { id: 'H12H13',num:13, desk:2, circleImg: `${imageBaseUrl}images/pic/GJ33-003270415Q.jpg`, circleTitle: '美女跟猩猩', links: 'https://www.plurk.com/laylong_00' },
  { id: 'H14',num:14, circleImg: `${imageBaseUrl}images/pic/GJ33-000700888W.jpg`, circleTitle: '忍給你看', links: 'https://www.plurk.com/sajohnnyapple' },
  { id: 'H15',num:15, circleImg: `${imageBaseUrl}images/pic/GJ33-001401664S.jpg`, circleTitle: '鯊忍者村', links: 'https://www.plurk.com/cor1879' },
  { id: 'H16',num:16, circleImg: `${imageBaseUrl}images/pic/GJ33-002073272R.jpg`, circleTitle: '豆腐是我的忍道', links: 'https://www.plurk.com/shigeru13' },
  { id: 'H17',num:17, circleImg: `${imageBaseUrl}images/pic/GJ33-002102411K.jpg`, circleTitle: '忍蛋農場', links: 'https://www.facebook.com/CrisP.617/' },
  { id: 'H18',num:18, circleImg: `${imageBaseUrl}images/pic/GJ33-002628065O.jpg`, circleTitle: '火星周遊', links: 'https://www.facebook.com/profile.php?id=100093809600596' },
  { id: 'H19',num:19, circleImg: `${imageBaseUrl}images/pic/GJ33-001635209F.jpg`, circleTitle: 'MM\'  Unit', links: 'https://mmunit.booth.pm/' },
  { id: 'H20',num:20, circleImg: `${imageBaseUrl}images/pic/GJ33-002832479F.jpg`, circleTitle: '死小孩遊樂園', links: 'https://www.doujin.com.tw/authors/info/r9742' },
  { id: 'H21',num:21, circleImg: `${imageBaseUrl}images/pic/GJ33-003708472E.jpg`, circleTitle: '起司星球', links: 'https://www.plurk.com/mister_mouse' },
  { id: 'H22',num:22, circleImg: `${imageBaseUrl}images/pic/GJ33-004759678Q.jpg`, circleTitle: '作法會計美女猩猩', links: 'https://www.plurk.com/wanju_' },
  { id: 'H23',num:23, circleImg: `${imageBaseUrl}images/pic/GJ33-000408896D.jpg`, circleTitle: '柚子小姐的創意教室', links: 'https://www.plurk.com/p/3h5kul2beh' },
  { id: 'H24',num:24, circleImg: `${imageBaseUrl}images/pic/GJ33-000730097Z.jpg`, circleTitle: '歐逆醬之亂', links: 'https://www.plurk.com/Mi_key' },
  { id: 'H25',num:25, circleImg: `${imageBaseUrl}images/pic/GJ33-005694094F.jpg`, circleTitle: '諸行無常', links: 'https://www.plurk.com/sternbild1976' },
  { id: 'H26',num:26, circleImg: `${imageBaseUrl}images/pic/GJ33-P004.jpg`, circleTitle: '細瑕', links: 'https://bsky.app/profile/batoshiroh.bsky.social' },
  { id: 'I01',num:1, circleImg: `${imageBaseUrl}images/pic/GJ33-002423652K.jpg`, circleTitle: '馬鈴薯農夫', links: 'https://www.plurk.com/che777' },
  { id: 'I02',num:2, circleImg: `${imageBaseUrl}images/pic/GJ33-001956405G.jpg`, circleTitle: '愛情陷阱', links: 'https://www.plurk.com/nam_a8aeef' },
  { id: 'I03',num:3, circleImg: `${imageBaseUrl}images/pic/GJ33-005168461F.jpg`, circleTitle: '豆腐委員會', links: 'https://www.plurk.com/shiau_yu' },
  { id: 'I04',num:4, circleImg: `${imageBaseUrl}images/pic/GJ33-000262810S.jpg`, circleTitle: '變身屋', links: 'https://www.facebook.com/71.QY.71' },
  { id: 'I05',num:5, circleImg: `${imageBaseUrl}images/pic/GJ33-000846858D.jpg`, circleTitle: '百円豆腐舖', links: 'https://www.facebook.com/profile.php?id=100007662784146' },
  { id: 'I06',num:6, circleImg: `${imageBaseUrl}images/pic/GJ33-004234058N.jpg`, circleTitle: '忍蛋大特賣', links: 'https://www.plurk.com/picnic13'}
];

export const locateStalls: LocateStall[] = [
  {id: 'A', num: 1, coords: {top: 67.4, left: 26.4, width: 3, height: 1.65}},
  {id: 'B', num: 1, coords: {top: 67.4, left: 32.4, width: 3, height: 1.65}},
  {id: 'C', num: 1, coords: {top: 67.4, left: 38.2, width: 3, height: 1.65}},
  {id: 'D', num: 1, coords: {top: 67.4, left: 44.2, width: 3, height: 1.65}},
  {id: 'E', num: 1, coords: {top: 67.4, left: 56, width: 3, height: 1.65}},
  {id: 'F', num: 1, coords: {top: 67.4, left: 62, width: 3, height: 1.65}},
  {id: 'G', num: 1, coords: {top: 67.4, left: 73.8, width: 3, height: 1.65}},
  {id: 'H', num: 1, coords: {top: 67.4, left: 78.6, width: 3, height: 1.65}},
  {id: 'I', num: 1, coords: {top: 75.5, left: 64.8, width: 2.8, height: 2 }}
];