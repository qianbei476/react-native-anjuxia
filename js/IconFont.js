/**
 * IconFont icon set component.
 * Usage: <IconFont name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from 'react-native-vector-icons';
const glyphMap = {
  "plus": 58880,
  "edit": 58881,
  "sound": 58882,
  "talk": 58883,
  "appreciate": 58884,
  "shop": 58885,
  "back": 58923,
  "right": 58924,
  "message": 58919,
  "appreciate-fill": 58886,
  "qushi": 58887,
  "search": 58888,
  "apple": 58917,
  "link": 58890,
  "talk1": 58891,
  "attention-fill": 58892,
  "attention": 58893,
  "cross": 58894,
  "check": 58895,
  "box": 58897,
  "process": 58898,
  "password": 58899,
  "share": 58900,
  "wifi": 58901,
  "message-fill": 58920,
  "my": 58902,
  "my-fill": 58903,
  "qq": 58904,
  "wechat": 58905,
  "weibo": 58906,
  "bar": 58907,
  "share1": 58925,
  "more": 58908,
  "other": 58909,
  "link4": 58921,
  "talk2": 58922,
  "setting": 58926,
  "home-fill": 58910,
  "home": 58911,
  "faxian-fill": 58912,
  "faxian": 58913,
  "www": 58889,
  "shebei": 58914,
  "kefu": 58915,
  "link-outline": 58916,
  "yidongmobile213": 58918
};

let IconFont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

module.exports = IconFont;
module.exports.glyphMap = glyphMap;
