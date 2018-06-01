/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : mf_localhost

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-06-01 20:49:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for verne_admin_actions
-- ----------------------------
DROP TABLE IF EXISTS `verne_admin_actions`;
CREATE TABLE `verne_admin_actions` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(5) unsigned NOT NULL DEFAULT '0',
  `action_name` varchar(32) NOT NULL DEFAULT '' COMMENT '方法名',
  `controller` varchar(32) NOT NULL DEFAULT '' COMMENT '控制器',
  `action` varchar(32) NOT NULL DEFAULT '' COMMENT '方法',
  `desc` varchar(32) NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态',
  `EN_name` varchar(255) DEFAULT NULL,
  `VN_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=178 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of verne_admin_actions
-- ----------------------------
INSERT INTO `verne_admin_actions` VALUES ('2', '0', '平台管理', 'server', '', 'C', '1', 'Manage Platform', 'Quản lý platform');
INSERT INTO `verne_admin_actions` VALUES ('3', '2', '结构一览', 'server', 'structure', 'A', '1', 'Structures', 'Giao');
INSERT INTO `verne_admin_actions` VALUES ('4', '2', '平台管理', 'server', 'platform', 'A', '1', 'Manage Platform', 'Quản lý platform');
INSERT INTO `verne_admin_actions` VALUES ('5', '2', '添加平台', 'server', 'addPlatform', 'A', '1', 'Add Platform', 'Thêm kênh');
INSERT INTO `verne_admin_actions` VALUES ('7', '2', '删除', 'server', 'drop', 'A', '1', 'Delete', 'Xóa');
INSERT INTO `verne_admin_actions` VALUES ('8', '2', '编辑平台', 'server', 'editPlatform', 'A', '1', 'Edit Platform', 'Edit kênh');
INSERT INTO `verne_admin_actions` VALUES ('9', '2', '服务器管理', 'server', 'index', 'A', '1', 'Manage Server', 'Quản lý server');
INSERT INTO `verne_admin_actions` VALUES ('10', '2', '添加服务器', 'server', 'addServer', 'A', '1', 'Add Server', 'Thuộc kênh');
INSERT INTO `verne_admin_actions` VALUES ('11', '2', '编辑服务器', 'server', 'editServer', 'A', '1', 'Edit Server', 'Mất hiệu lực');
INSERT INTO `verne_admin_actions` VALUES ('12', '0', '游戏管理', 'game', '', 'C', '1', 'Manage Game', 'Quản lý game');
INSERT INTO `verne_admin_actions` VALUES ('13', '12', '公告列表', 'game', 'push', 'A', '1', 'Notices', 'Thông báo danh sách');
INSERT INTO `verne_admin_actions` VALUES ('14', '12', '添加公告', 'game', 'addPush', 'A', '1', 'Add Notice', 'Thêm mới thưởng');
INSERT INTO `verne_admin_actions` VALUES ('15', '12', '重新发送', 'game', 'editPush', 'A', '1', 'Resend', 'Gửi lại');
INSERT INTO `verne_admin_actions` VALUES ('16', '12', '游戏公告', 'game', 'notice', 'A', '0', 'Game Notices', 'Thao tác');
INSERT INTO `verne_admin_actions` VALUES ('17', '12', '添加公告', 'game', 'addNotice', 'A', '0', 'Add Notice', 'Thêm mới thưởng');
INSERT INTO `verne_admin_actions` VALUES ('18', '12', '编辑公告', 'game', 'editNotice', 'A', '0', 'Edit Notice', 'Edit thông báo');
INSERT INTO `verne_admin_actions` VALUES ('19', '12', '活动发布', 'game', 'event', 'A', '0', 'Publish Event', 'Công bố hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('20', '12', '添加活动', 'game', 'addEvent', 'A', '0', 'Add Event', 'Thêm hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('21', '12', '编辑活动', 'game', 'editEvent', 'A', '0', 'Edit Event', 'Edit hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('22', '12', '删除', 'game', 'drop', 'A', '1', 'Delete', 'Xóa');
INSERT INTO `verne_admin_actions` VALUES ('23', '0', '玩家操作', 'player', '', 'C', '1', 'Player Action', 'Thao tác người chơi');
INSERT INTO `verne_admin_actions` VALUES ('24', '23', '指定玩家发放道具', 'player', 'addProperty', 'A', '0', 'Send items to a specific player', 'Tên nhân vật');
INSERT INTO `verne_admin_actions` VALUES ('25', '23', '道具发放历史记录', 'player', 'propList', 'A', '0', 'Item Sent History', 'Nhật ký phát đạo cụ');
INSERT INTO `verne_admin_actions` VALUES ('26', '0', '运营数据监控', 'monitor', '', 'C', '1', 'Monitor Operation Data', 'Khống chế dữ liệu vận hành');
INSERT INTO `verne_admin_actions` VALUES ('27', '26', '查看在线', 'monitor', 'online', 'A', '1', 'View Online', 'Xem online');
INSERT INTO `verne_admin_actions` VALUES ('28', '26', '平均在线数据', 'monitor', 'onlineSevenDataAvg', 'A', '1', 'Average Online Data', 'Dữ liệu online bình quân');
INSERT INTO `verne_admin_actions` VALUES ('29', '26', '最高在线数据', 'monitor', 'monitor', 'A', '1', 'Highest Online Data', 'Dữ liệu online cao nhất');
INSERT INTO `verne_admin_actions` VALUES ('30', '26', '充值明细', 'monitor', 'recharge', 'A', '1', 'Recharge Details', 'Chi tiết nạp');
INSERT INTO `verne_admin_actions` VALUES ('31', '26', '付费统计', 'monitor', 'rechargeCount', 'A', '1', 'Payment Statistics', 'Thống kê trả phí');
INSERT INTO `verne_admin_actions` VALUES ('32', '0', '运营管理操作', 'operation', '', 'C', '1', 'Operation Management Action', 'Thứ tự');
INSERT INTO `verne_admin_actions` VALUES ('33', '32', '编辑系统信件', 'operation', 'deleteSysMail', 'A', '1', 'Edit System Mail', 'Edit thư hệ thống');
INSERT INTO `verne_admin_actions` VALUES ('34', '32', '新增将魂拍卖', 'operation', 'addAuction', 'A', '0', 'Add Ninja\'s Soul Auction', 'Thêm đấu giá Tướng Hồn');
INSERT INTO `verne_admin_actions` VALUES ('35', '32', '编辑将魂拍卖', 'operation', 'editAuction', 'A', '0', 'Edit Ninja\'s Soul Auction', 'Edit đấu giá Tướng Hồn');
INSERT INTO `verne_admin_actions` VALUES ('36', '32', '充值活动列表', 'operation', 'rechargeActivity', 'A', '0', 'Recharge Event List', 'Danh sách hoạt động nạp');
INSERT INTO `verne_admin_actions` VALUES ('37', '32', '添加充值活动', 'operation', 'addRechargeActivity', 'A', '0', 'Add Recharge Event', 'Thêm hoạt động nạp');
INSERT INTO `verne_admin_actions` VALUES ('38', '32', '编辑充值活动', 'operation', 'editRechargeActivity', 'A', '0', 'Edit Recharge Event', 'Edit hoạt động nạp');
INSERT INTO `verne_admin_actions` VALUES ('39', '32', '删除', 'operation', 'drop', 'A', '1', 'Delete', 'Xóa');
INSERT INTO `verne_admin_actions` VALUES ('40', '0', 'KEY码管理', 'key', '', 'C', '1', 'Manage Key Code', 'Quản lý KEY');
INSERT INTO `verne_admin_actions` VALUES ('41', '40', 'key码列表', 'key', 'index', 'A', '1', 'Key Code List', 'Danh sách KEY');
INSERT INTO `verne_admin_actions` VALUES ('42', '40', 'key码生成', 'key', 'addKey', 'A', '1', 'Generate Key Code', 'Tạo mã KEY');
INSERT INTO `verne_admin_actions` VALUES ('43', '40', 'KEY码类别管理', 'key', 'keyClass', 'A', '1', 'Manage Key Code Category', 'Quản lý loại KEY');
INSERT INTO `verne_admin_actions` VALUES ('44', '40', 'KEY码类别添加', 'key', 'addKeyClass', 'A', '1', 'Add Key Code Category', 'Thêm loại KEY');
INSERT INTO `verne_admin_actions` VALUES ('45', '40', '编辑KEY码类别', 'key', 'editKeyClass', 'A', '1', 'Edit Key Code Category', 'Edit mã KEY');
INSERT INTO `verne_admin_actions` VALUES ('47', '40', '删除', 'key', 'drop', 'A', '1', 'Delete', 'Xóa');
INSERT INTO `verne_admin_actions` VALUES ('48', '0', '系统配置', 'admin', '', 'C', '1', 'System Configurations', 'Thời gian');
INSERT INTO `verne_admin_actions` VALUES ('49', '48', '角色管理', 'admin', 'role', 'A', '1', 'Manage Character', 'Tìm');
INSERT INTO `verne_admin_actions` VALUES ('50', '48', '添加角色', 'admin', 'addRole', 'A', '1', 'Add Character', 'Thêm nhân vật');
INSERT INTO `verne_admin_actions` VALUES ('51', '48', '编辑角色', 'admin', 'editRole', 'A', '1', 'Edit Character', 'Edit nhân vật');
INSERT INTO `verne_admin_actions` VALUES ('52', '48', '删除角色', 'admin', 'dropRole', 'A', '1', 'Delete Character', 'Xóa nhân vật');
INSERT INTO `verne_admin_actions` VALUES ('53', '48', '用户列表', 'admin', 'index', 'A', '1', 'Use List', 'Danh sách user');
INSERT INTO `verne_admin_actions` VALUES ('54', '48', '添加用户', 'admin', 'addAdmin', 'A', '1', 'Add User', 'Thêm user');
INSERT INTO `verne_admin_actions` VALUES ('55', '48', '编辑用户', 'admin', 'editAdmin', 'A', '1', 'Edit User', 'Edit user');
INSERT INTO `verne_admin_actions` VALUES ('56', '48', '控制器列表', 'admin', 'permitAction', 'A', '1', 'Controller List', 'Danh sách controller');
INSERT INTO `verne_admin_actions` VALUES ('57', '48', '添加控制器', 'admin', 'addPermitAction', 'A', '1', 'Add Controller', 'Thêm bộ điều khiển');
INSERT INTO `verne_admin_actions` VALUES ('58', '48', '删除用户', 'admin', 'drop', 'A', '1', 'Delete User', 'Xóa user');
INSERT INTO `verne_admin_actions` VALUES ('59', '26', '商城道具购买记录', 'monitor', 'equipPurchaseHistory', 'A', '0', 'Shop Item Purchase Record', 'Nhật ký mua đạo cụ cửa hàng');
INSERT INTO `verne_admin_actions` VALUES ('60', '26', '商城道具购买统计', 'monitor', 'equipPurchaseHistoryCount', 'A', '0', 'Shop Item Purchase Statistics', 'Thống kê mua đạo cụ cửa hàng');
INSERT INTO `verne_admin_actions` VALUES ('61', '23', '指定玩家信息查询', 'player', 'getRoleInfo', 'A', '1', 'Search a specific player\'s info', 'Xem thông tin người chơi chỉ định');
INSERT INTO `verne_admin_actions` VALUES ('62', '23', '全服玩家角色信息', 'player', 'roleInfoList', 'A', '0', 'All players\' character info in all servers', 'Thông tin nhân vật người chơi toàn server');
INSERT INTO `verne_admin_actions` VALUES ('63', '23', '指定玩家军团查询', 'player', 'getMassInfo', 'A', '0', 'Search a specific player\'s legion info', 'Xem quân đoàn người chơi chỉ định');
INSERT INTO `verne_admin_actions` VALUES ('64', '23', '指定城市信息查询', 'player', 'getCityInfo', 'A', '0', 'Search a specific city info', 'Xem thông tin thành thị chỉ định');
INSERT INTO `verne_admin_actions` VALUES ('65', '23', '道具明细', 'player', 'DataMonitorByEquip', 'A', '1', 'Item Details', 'Chi tiết đạo cụ');
INSERT INTO `verne_admin_actions` VALUES ('66', '23', '货币明细', 'player', 'PayLogList', 'A', '1', 'Currency Details', 'Chi tiết tiền');
INSERT INTO `verne_admin_actions` VALUES ('67', '26', '角色创建统计', 'monitor', 'roleCreate', 'A', '1', 'Character Creation Data', 'Thống kê tạo nhân vật');
INSERT INTO `verne_admin_actions` VALUES ('68', '26', '留存统计列表', 'monitor', 'playerSurvival', 'A', '1', 'Retention Statistics List', 'Danh sách thống kê tồn');
INSERT INTO `verne_admin_actions` VALUES ('69', '26', '活跃统计列表', 'monitor', 'playerActive', 'A', '0', 'Active Statistics List', 'Danh sách thống kê năng động');
INSERT INTO `verne_admin_actions` VALUES ('70', '26', '等级用户分布列表', 'monitor', 'lostLevel', 'A', '0', 'User Level Distribution List', 'Danh sách phân bổ user theo cấp');
INSERT INTO `verne_admin_actions` VALUES ('71', '23', '玩家行为描述字典', 'player', 'roleActionDictionary', 'A', '0', 'Players\' behavior description dictionary', 'Từ điển miêu tả hành vi người chơi');
INSERT INTO `verne_admin_actions` VALUES ('72', '26', '导出商城购买记录查询结果', 'monitor', 'exportEquipPurchaseHistory', 'A', '0', 'Export shop purchase record search result', 'Export kết quả tìm nhật ký mua ở Cửa Hàng');
INSERT INTO `verne_admin_actions` VALUES ('73', '23', '导出威望值前100数据', 'player', 'exportRoleInfoList', 'A', '0', 'Export top 100 Fame data', 'Export dữ liệu Top 100 Uy Danh');
INSERT INTO `verne_admin_actions` VALUES ('74', '26', '角色创建统计小时段查询', 'monitor', 'roleCreateByHour', 'A', '0', 'Search character creation Statistics hourly', 'Thống kê tạo nhân vật theo giờ');
INSERT INTO `verne_admin_actions` VALUES ('75', '23', '指定玩家禁言/冻结', 'player', 'gameUserFreeze', 'A', '1', 'Ban a specific player to chat/suspend his account', 'Chỉ định người chơi cấm ngôn/đóng băng');
INSERT INTO `verne_admin_actions` VALUES ('76', '23', '玩家禁闭禁言列表', 'player', 'gameUserFreezeList', 'A', '1', 'Player\'s Ban List', 'Danh sách người chơi cấm nói');
INSERT INTO `verne_admin_actions` VALUES ('77', '26', '充值排行', 'monitor', 'rechargeRanking', 'A', '1', 'Top-Up Ranking', 'Hạng nạp');
INSERT INTO `verne_admin_actions` VALUES ('78', '26', '每日民心领取人数', 'monitor', 'goldReceiveInfo', 'A', '0', 'Daily Support Claimers', 'Số người nhận Lòng Dân mỗi ngày');
INSERT INTO `verne_admin_actions` VALUES ('79', '26', '民心产出', 'monitor', 'PopularOutput', 'A', '0', 'Support Rewards', 'Lòng Dân tạo ra');
INSERT INTO `verne_admin_actions` VALUES ('80', '26', '礼券产出', 'monitor', 'GiftOutput', 'A', '0', 'Coupon Rewards', 'Củ Khóa tạo ra');
INSERT INTO `verne_admin_actions` VALUES ('81', '26', '民心消耗', 'monitor', 'PopularExpend', 'A', '0', 'Support Cost', 'Lòng Dân tiêu hao');
INSERT INTO `verne_admin_actions` VALUES ('82', '26', '礼券消耗', 'monitor', 'GiftExpend', 'A', '0', 'Coupon Cost', 'Củ Khóa tiêu phí');
INSERT INTO `verne_admin_actions` VALUES ('83', '26', '在线时长统计', 'monitor', 'onlineTimeCount', 'A', '0', 'Online Time Statistics', 'Thống kê thời gian online');
INSERT INTO `verne_admin_actions` VALUES ('84', '23', '玩家行为字典维护ADD', 'player', 'addRoleActionDictionary', 'A', '0', 'Add players\' behavior dictionary maintenance', 'ADD bảo trì từ điển hành vi người chơi');
INSERT INTO `verne_admin_actions` VALUES ('85', '23', '玩家行为字典维护EDIT', 'player', 'editRoleActionDictionary', 'A', '0', 'Edit players\' behavior dictionary maintenance', 'EDIT bảo trì từ điển hành vi người chơi');
INSERT INTO `verne_admin_actions` VALUES ('86', '23', '字典列表和维护DROP', 'player', 'droproleActionDictionary', 'A', '0', 'Drop dictionary list and maintenance', 'DROP bảo trì và danh sách từ điển');
INSERT INTO `verne_admin_actions` VALUES ('87', '26', '商城道具首次购买', 'monitor', 'equipFirstTimeBuyersCount', 'A', '0', 'Buy shop items for the first time', 'Mua đạo cụ cửa hàng lần đầu');
INSERT INTO `verne_admin_actions` VALUES ('88', '26', '导出初始商城购买记录', 'monitor', 'exportEquipFirstTimeBuyersCount', 'A', '0', 'Export initial shop purchase record', 'Export nhật ký mua cửa hàng khởi tạo');
INSERT INTO `verne_admin_actions` VALUES ('89', '143', '用户加载数据', 'pm_monitor', 'userConversionRate', 'A', '1', 'User Loading Data', 'User tải data');
INSERT INTO `verne_admin_actions` VALUES ('90', '26', '用户转化率详细', 'monitor', 'userConversionRateByDay', 'A', '0', 'User Conversion Rate Details', 'Chi tiết chuyển hóa user');
INSERT INTO `verne_admin_actions` VALUES ('91', '26', '查看在线', 'monitor', 'onlineDataByFifteenStep', 'A', '1', 'View Online', 'Xem online');
INSERT INTO `verne_admin_actions` VALUES ('92', '26', '导出等级用户分布', 'monitor', 'exportLostLevelData', 'A', '0', 'Export user distribution in different levels.', 'Export phân bổ user theo cấp');
INSERT INTO `verne_admin_actions` VALUES ('93', '26', '新历史在线', 'monitor', 'historyOnlineData', 'A', '1', 'New History Online', 'Nhật ký online mới');
INSERT INTO `verne_admin_actions` VALUES ('94', '40', 'key码查询结果导出', 'key', 'exportKeyList', 'A', '1', 'Export Key Code Search Result', 'Export kết quả tìm mã key');
INSERT INTO `verne_admin_actions` VALUES ('95', '26', '全服充值一览', 'monitor', 'rechargeCountBySer', 'A', '1', 'Server Top-Up Review', 'Xem nạp toàn server');
INSERT INTO `verne_admin_actions` VALUES ('96', '26', '等级完成活跃值统计', 'monitor', 'gradeActiveInfo', 'A', '0', 'Level Completion Activity Statistics', 'Ngày');
INSERT INTO `verne_admin_actions` VALUES ('97', '26', '国战信息统计', 'monitor', 'nationalWarInfo', 'A', '0', 'Country Battle Statistics', 'Thống kê thông tin Quốc Chiến');
INSERT INTO `verne_admin_actions` VALUES ('101', '26', '购买行为监控报警限制设定', 'monitor', 'buyGoodsBehaviorLimitSet', 'A', '0', 'Purchase behavior monitoring alarm limit setting', 'Thiết lập hạn chế cảnh báo hành vi mua');
INSERT INTO `verne_admin_actions` VALUES ('102', '26', '购买行为监控报警限制设定List', 'monitor', 'buyGoodsBehaviorLimitSetList', 'A', '0', 'Purchase behavior monitoring alarm limit setting list', 'List thiết lập hạn chế cảnh báo hành vi mua');
INSERT INTO `verne_admin_actions` VALUES ('103', '26', '道具增量异常监控', 'monitor', 'roleitemAbmormal', 'A', '0', 'Item increment exception monitoring', 'Giám sát tăng đạo cụ bất thường');
INSERT INTO `verne_admin_actions` VALUES ('104', '26', '删除异常数据', 'monitor', 'drop', 'A', '0', 'Delete Data Exception', 'Xóa dữ liệu bất thường');
INSERT INTO `verne_admin_actions` VALUES ('105', '32', '发放红包', 'operation', 'giveOutRedEnvelope', 'A', '0', 'Send Red Packet', 'Phát Lì Xì');
INSERT INTO `verne_admin_actions` VALUES ('106', '32', '红包发放历史', 'operation', 'giveOutRedEnvelopeList', 'A', '0', 'Red Packet Sent History', 'Nhật ký phát Lì Xì');
INSERT INTO `verne_admin_actions` VALUES ('107', '32', '编辑红包活动', 'operation', 'editGiveOutRedEnvelope', 'A', '0', 'Edit Red Packet Event', 'Edit hoạt động Lì Xì');
INSERT INTO `verne_admin_actions` VALUES ('108', '26', '民心礼券增量异常', 'monitor', 'giftGoldAbmormal', 'A', '0', 'Support Voucher Increment Exception', 'Lòng Dân, Củ Khóa tăng bất thường');
INSERT INTO `verne_admin_actions` VALUES ('109', '26', '级别波动异常设置', 'monitor', 'levelWarningSet', 'A', '0', 'Level Fluctuation Exception Setting', 'Thiết lập cấp không ổn định');
INSERT INTO `verne_admin_actions` VALUES ('110', '26', '级别波动异常设置List', 'monitor', 'levelWarningSetList', 'A', '0', 'Level Fluctuation Exception Setting List', 'List thiết lập cấp không ổn định');
INSERT INTO `verne_admin_actions` VALUES ('111', '26', '等级波动异常', 'monitor', 'levelWarning', 'A', '0', 'Level fluctuation exception', 'Sóng cấp lỗi');
INSERT INTO `verne_admin_actions` VALUES ('112', '26', '民心礼券监控报警限制设定', 'monitor', 'giftGoldBehaviorLimitSet', 'A', '0', 'Support voucher monitoring alarm limit settings', 'Thiết lập hạn chế cảnh báo Lòng Dân, Củ Khóa');
INSERT INTO `verne_admin_actions` VALUES ('116', '26', '付费用户等级监控', 'monitor', 'rechargePlayerLevel', 'A', '0', 'Paying user level monitoring', 'Giám sát cấp người chơi trả phí');
INSERT INTO `verne_admin_actions` VALUES ('117', '143', '道具购买价格', 'pm_monitor', 'getItemPriceSales', 'A', '1', 'Item purchase price', 'Giá mua đạo cụ');
INSERT INTO `verne_admin_actions` VALUES ('118', '143', '道具销售', 'pm_monitor', 'itemSalesCount', 'A', '1', 'Item sales', 'Bán đạo cụ');
INSERT INTO `verne_admin_actions` VALUES ('119', '143', '付费点使用', 'pm_monitor', 'getPayCountByAction', 'A', '1', 'Use charge point', 'Dùng ở điểm trả phí');
INSERT INTO `verne_admin_actions` VALUES ('120', '143', '销售数据', 'pm_monitor', 'creditSalesCount', 'A', '1', 'Sales data', 'Dữ liệu bán');
INSERT INTO `verne_admin_actions` VALUES ('121', '40', '启用KEY码类别', 'key', 'toggle_state', 'A', '1', 'Enable key code type', 'Mở loại mã KEY');
INSERT INTO `verne_admin_actions` VALUES ('122', '48', '静态数据列表', 'admin', 'staticDataList', 'A', '1', 'Static data list', 'Danh sách data tĩnh');
INSERT INTO `verne_admin_actions` VALUES ('123', '48', '静态数据表删除', 'admin', 'staticDataDel', 'A', '1', 'Delete  static data list', 'Xóa danh sách dữ liệu tĩnh');
INSERT INTO `verne_admin_actions` VALUES ('124', '48', '静态数据表修改', 'admin', 'staticDataUpdate', 'A', '1', 'Update static data list', 'Xóa danh sách dữ liệu tĩnh');
INSERT INTO `verne_admin_actions` VALUES ('125', '48', '静态数据表添加', 'admin', 'staticDataAdd', 'A', '1', 'ADD static data list', 'Xóa danh sách dữ liệu tĩnh');
INSERT INTO `verne_admin_actions` VALUES ('126', '32', '系统信件', 'operation', 'sysMail', 'A', '1', 'System mail', 'Thư hệ thống');
INSERT INTO `verne_admin_actions` VALUES ('127', '32', '系统信件记录', 'operation', 'sysMailList', 'A', '1', 'System mail log', 'Nhật ký thư hệ thống');
INSERT INTO `verne_admin_actions` VALUES ('128', '32', '系统信件发送', 'operation', 'sendMail', 'A', '1', 'Send system mail', 'Gửi thư hệ thống');
INSERT INTO `verne_admin_actions` VALUES ('129', '23', '禁言禁号列表', 'operation', 'gameUserFreezeList', 'A', '1', 'Banned user list', 'Danh sách khóa acc, cấm nói');
INSERT INTO `verne_admin_actions` VALUES ('130', '23', '解禁', 'player', 'unfreeze', 'A', '1', 'Lift a ban', 'Mở khóa');
INSERT INTO `verne_admin_actions` VALUES ('131', '48', '添加平台换算比率', 'admin', 'addPaltRate', 'A', '1', 'Add platform exchange ratio', 'Thêm tỉ lệ chuyển đổi kênh');
INSERT INTO `verne_admin_actions` VALUES ('132', '48', '编辑平台换算比率', 'admin', 'editPaltRate', 'A', '1', 'Edit platform exchange ratio', 'Edit tỉ lệ chuyển đổi kênh');
INSERT INTO `verne_admin_actions` VALUES ('133', '48', '平台换算比率列表', 'admin', 'paltRateList', '', '1', 'Platform exchange ratio list', 'Danh sách tỉ lệ chuyển đổi kênh');
INSERT INTO `verne_admin_actions` VALUES ('134', '48', '删除换算比率', 'admin', 'dropCom', '', '1', 'Delete exchange ratio', 'Xóa tỉ lệ chuyển đổi');
INSERT INTO `verne_admin_actions` VALUES ('135', '26', '任务流失率', 'monitor', 'taskInfoList', 'A', '0', 'Quest drop rate', 'Tỷ lệ hao mòn nhiệm vụ');
INSERT INTO `verne_admin_actions` VALUES ('136', '2', '清除指定服务器数据', 'server', 'clearDataBySerID', '', '1', 'Clear specified server data', 'Xóa dữ liệu server chỉ định');
INSERT INTO `verne_admin_actions` VALUES ('137', '26', 'VIP卡月卡明细', 'monitor', 'getVipCardsList', 'A', '1', 'Monthly VIP Card details', 'Chi tiết thẻ Thẻ VIP Tháng');
INSERT INTO `verne_admin_actions` VALUES ('138', '26', '查看整点在线', 'monitor', 'onlineDataByHour', 'A', '1', 'Check hourly online data', 'Xem online giờ chẵn');
INSERT INTO `verne_admin_actions` VALUES ('139', '26', '服务器当前在线', 'monitor', 'onlineDataByServer', 'A', '1', 'Current online data', 'Server hiện đang online');
INSERT INTO `verne_admin_actions` VALUES ('140', '32', '执行任务列表', 'operation', 'executeTask', 'A', '1', 'Perform task list', 'Danh sách làm nhiệm vụ');
INSERT INTO `verne_admin_actions` VALUES ('141', '32', '执行任务', 'operation', 'execute', 'A', '1', 'Perform tasks', 'Làm nhiệm vụ');
INSERT INTO `verne_admin_actions` VALUES ('142', '32', '编辑系统信件', 'operation', 'editSysMail', 'A', '1', 'Edit system mail', 'Edit thư hệ thống');
INSERT INTO `verne_admin_actions` VALUES ('143', '0', '产品运营管理', 'pm_monitor', '', 'C', '1', 'Production operation management', 'Quản lý vận hành sản phẩm');
INSERT INTO `verne_admin_actions` VALUES ('144', '32', '添加活动', 'operation', 'addActive', 'A', '1', 'Add events', 'Thêm hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('145', '26', '全服付费统计', 'monitor', 'rechargeCountAllSer', 'A', '1', 'Server paying statistics', 'Thống kê nạp toàn server');
INSERT INTO `verne_admin_actions` VALUES ('146', '32', '活动列表', 'operation', 'activeList', 'A', '1', 'Event list', 'Danh sách hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('147', '32', '关闭活动', 'operation', 'closeActive', 'A', '1', 'Close event', 'Đóng hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('148', '32', '编辑活动', 'operation', 'editActive', 'A', '1', 'Edit event', 'Edit hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('149', '32', '活动数据', 'operation', 'activeData', '', '1', 'Event data', 'Dữ liệu hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('150', '32', '活动领取详情', 'operation', 'activeAwardInfo', '', '1', 'Event collection details', 'Chi tiết nhận hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('151', '32', '添加活动奖励', 'operation', 'addActive_addAward', '', '1', 'Add event rewards', 'Thêm thưởng hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('152', '32', '添加活动确认', 'operation', 'addActive_confim', '', '1', 'Add event confirmations', 'Thêm xác nhận hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('153', '32', '编辑活动时间和服务器', 'operation', 'editActiveBase', '', '1', 'Edit event time and servers', 'Edit thời gian và server hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('154', '32', '编辑活动奖励', 'operation', 'edit_addActive_addAward', '', '1', 'Edit event rewards', 'Edit thưởng hoạt động');
INSERT INTO `verne_admin_actions` VALUES ('166', '23', '类型信息查询', 'player', 'getByTypeInfo', 'A', '1', 'Type info query', 'Xem thông tin loại');
INSERT INTO `verne_admin_actions` VALUES ('165', '23', '数据类型查询玩家分类信息', 'player', 'getInfoByType', 'A', '1', 'Check player type info by data type', 'Xem thông tin người chơi theo loại dữ liệu');
INSERT INTO `verne_admin_actions` VALUES ('167', '26', ' 等级/用户量统计', 'Monitor', 'playerLevel', 'A', '1', 'Level/user statistics', 'Thống kê cấp/user');
INSERT INTO `verne_admin_actions` VALUES ('168', '12', ' 发送公告', 'Game', 'pushToServers', 'A', '1', 'Send notice', 'Gửi thông báo');
INSERT INTO `verne_admin_actions` VALUES ('169', '26', '每个小时注册/创角统计', 'monitor', 'getPlayers_ByOnlineTime', 'A', '1', 'Hourly registration/character creation statistics', 'Thống kê đăng ký/tạo nhân vật mỗi giờ');
INSERT INTO `verne_admin_actions` VALUES ('170', '26', '在线时长用户统计', 'monitor', 'playerOnlineTimeTotal', 'A', '1', 'User statistics by online time', 'Thống kê thời gian user online');
INSERT INTO `verne_admin_actions` VALUES ('171', '32', '添加内置活动', 'operation', 'addActiveBuiltIn', 'A', '1', null, null);
INSERT INTO `verne_admin_actions` VALUES ('172', '32', '内置活动列表', 'operation', 'ActiveBuiltIn', 'A', '1', null, null);
INSERT INTO `verne_admin_actions` VALUES ('173', '32', '编辑内置活动', 'operation', 'editActiveBuiltIn', 'A', '1', null, null);
INSERT INTO `verne_admin_actions` VALUES ('174', '48', '三忍传承列表', 'operation', 'activeInherit', 'A', '1', null, null);
INSERT INTO `verne_admin_actions` VALUES ('175', '32', '审核通过三忍传承', 'operation', 'activeInherit_confirm', 'A', '1', null, null);
INSERT INTO `verne_admin_actions` VALUES ('176', '32', '关闭三忍传承', 'operation', 'closeInherit', 'A', '1', null, null);
INSERT INTO `verne_admin_actions` VALUES ('177', '32', '资源数据监控', 'monitor', 'materialLog', 'A', '1', null, null);

-- ----------------------------
-- Table structure for verne_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `verne_admin_role`;
CREATE TABLE `verne_admin_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of verne_admin_role
-- ----------------------------

-- ----------------------------
-- Table structure for verne_admin_role_action
-- ----------------------------
DROP TABLE IF EXISTS `verne_admin_role_action`;
CREATE TABLE `verne_admin_role_action` (
  `role_id` int(5) unsigned NOT NULL COMMENT '角色表ID',
  `action_id` int(5) unsigned NOT NULL COMMENT '控制器ID',
  PRIMARY KEY (`role_id`,`action_id`),
  UNIQUE KEY `ADX_ar_id` (`role_id`,`action_id`) USING BTREE,
  KEY `action_id` (`action_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of verne_admin_role_action
-- ----------------------------
INSERT INTO `verne_admin_role_action` VALUES ('1', '3');
INSERT INTO `verne_admin_role_action` VALUES ('1', '4');
INSERT INTO `verne_admin_role_action` VALUES ('1', '5');
INSERT INTO `verne_admin_role_action` VALUES ('1', '7');
INSERT INTO `verne_admin_role_action` VALUES ('1', '8');
INSERT INTO `verne_admin_role_action` VALUES ('1', '9');
INSERT INTO `verne_admin_role_action` VALUES ('1', '10');
INSERT INTO `verne_admin_role_action` VALUES ('1', '11');
INSERT INTO `verne_admin_role_action` VALUES ('1', '13');
INSERT INTO `verne_admin_role_action` VALUES ('1', '14');
INSERT INTO `verne_admin_role_action` VALUES ('1', '15');
INSERT INTO `verne_admin_role_action` VALUES ('1', '22');
INSERT INTO `verne_admin_role_action` VALUES ('1', '27');
INSERT INTO `verne_admin_role_action` VALUES ('1', '28');
INSERT INTO `verne_admin_role_action` VALUES ('1', '29');
INSERT INTO `verne_admin_role_action` VALUES ('1', '30');
INSERT INTO `verne_admin_role_action` VALUES ('1', '31');
INSERT INTO `verne_admin_role_action` VALUES ('1', '33');
INSERT INTO `verne_admin_role_action` VALUES ('1', '39');
INSERT INTO `verne_admin_role_action` VALUES ('1', '41');
INSERT INTO `verne_admin_role_action` VALUES ('1', '42');
INSERT INTO `verne_admin_role_action` VALUES ('1', '43');
INSERT INTO `verne_admin_role_action` VALUES ('1', '44');
INSERT INTO `verne_admin_role_action` VALUES ('1', '45');
INSERT INTO `verne_admin_role_action` VALUES ('1', '47');
INSERT INTO `verne_admin_role_action` VALUES ('1', '49');
INSERT INTO `verne_admin_role_action` VALUES ('1', '50');
INSERT INTO `verne_admin_role_action` VALUES ('1', '51');
INSERT INTO `verne_admin_role_action` VALUES ('1', '52');
INSERT INTO `verne_admin_role_action` VALUES ('1', '53');
INSERT INTO `verne_admin_role_action` VALUES ('1', '54');
INSERT INTO `verne_admin_role_action` VALUES ('1', '55');
INSERT INTO `verne_admin_role_action` VALUES ('1', '56');
INSERT INTO `verne_admin_role_action` VALUES ('1', '57');
INSERT INTO `verne_admin_role_action` VALUES ('1', '58');
INSERT INTO `verne_admin_role_action` VALUES ('1', '61');
INSERT INTO `verne_admin_role_action` VALUES ('1', '65');
INSERT INTO `verne_admin_role_action` VALUES ('1', '66');
INSERT INTO `verne_admin_role_action` VALUES ('1', '67');
INSERT INTO `verne_admin_role_action` VALUES ('1', '68');
INSERT INTO `verne_admin_role_action` VALUES ('1', '75');
INSERT INTO `verne_admin_role_action` VALUES ('1', '76');
INSERT INTO `verne_admin_role_action` VALUES ('1', '77');
INSERT INTO `verne_admin_role_action` VALUES ('1', '89');
INSERT INTO `verne_admin_role_action` VALUES ('1', '91');
INSERT INTO `verne_admin_role_action` VALUES ('1', '93');
INSERT INTO `verne_admin_role_action` VALUES ('1', '94');
INSERT INTO `verne_admin_role_action` VALUES ('1', '95');
INSERT INTO `verne_admin_role_action` VALUES ('1', '117');
INSERT INTO `verne_admin_role_action` VALUES ('1', '118');
INSERT INTO `verne_admin_role_action` VALUES ('1', '119');
INSERT INTO `verne_admin_role_action` VALUES ('1', '120');
INSERT INTO `verne_admin_role_action` VALUES ('1', '121');
INSERT INTO `verne_admin_role_action` VALUES ('1', '122');
INSERT INTO `verne_admin_role_action` VALUES ('1', '123');
INSERT INTO `verne_admin_role_action` VALUES ('1', '124');
INSERT INTO `verne_admin_role_action` VALUES ('1', '125');
INSERT INTO `verne_admin_role_action` VALUES ('1', '126');
INSERT INTO `verne_admin_role_action` VALUES ('1', '127');
INSERT INTO `verne_admin_role_action` VALUES ('1', '128');
INSERT INTO `verne_admin_role_action` VALUES ('1', '129');
INSERT INTO `verne_admin_role_action` VALUES ('1', '130');
INSERT INTO `verne_admin_role_action` VALUES ('1', '131');
INSERT INTO `verne_admin_role_action` VALUES ('1', '132');
INSERT INTO `verne_admin_role_action` VALUES ('1', '133');
INSERT INTO `verne_admin_role_action` VALUES ('1', '134');
INSERT INTO `verne_admin_role_action` VALUES ('1', '136');
INSERT INTO `verne_admin_role_action` VALUES ('1', '137');
INSERT INTO `verne_admin_role_action` VALUES ('1', '138');
INSERT INTO `verne_admin_role_action` VALUES ('1', '139');
INSERT INTO `verne_admin_role_action` VALUES ('1', '140');
INSERT INTO `verne_admin_role_action` VALUES ('1', '141');
INSERT INTO `verne_admin_role_action` VALUES ('1', '142');
INSERT INTO `verne_admin_role_action` VALUES ('1', '144');
INSERT INTO `verne_admin_role_action` VALUES ('1', '145');
INSERT INTO `verne_admin_role_action` VALUES ('1', '146');
INSERT INTO `verne_admin_role_action` VALUES ('1', '147');
INSERT INTO `verne_admin_role_action` VALUES ('1', '148');
INSERT INTO `verne_admin_role_action` VALUES ('1', '149');
INSERT INTO `verne_admin_role_action` VALUES ('1', '150');
INSERT INTO `verne_admin_role_action` VALUES ('1', '151');
INSERT INTO `verne_admin_role_action` VALUES ('1', '152');
INSERT INTO `verne_admin_role_action` VALUES ('1', '153');
INSERT INTO `verne_admin_role_action` VALUES ('1', '154');
INSERT INTO `verne_admin_role_action` VALUES ('1', '165');
INSERT INTO `verne_admin_role_action` VALUES ('1', '166');
INSERT INTO `verne_admin_role_action` VALUES ('1', '167');
INSERT INTO `verne_admin_role_action` VALUES ('1', '168');
INSERT INTO `verne_admin_role_action` VALUES ('1', '169');
INSERT INTO `verne_admin_role_action` VALUES ('1', '170');
INSERT INTO `verne_admin_role_action` VALUES ('1', '171');
INSERT INTO `verne_admin_role_action` VALUES ('1', '172');
INSERT INTO `verne_admin_role_action` VALUES ('1', '173');
INSERT INTO `verne_admin_role_action` VALUES ('1', '174');
INSERT INTO `verne_admin_role_action` VALUES ('1', '175');
INSERT INTO `verne_admin_role_action` VALUES ('1', '176');
INSERT INTO `verne_admin_role_action` VALUES ('1', '177');
INSERT INTO `verne_admin_role_action` VALUES ('2', '3');
INSERT INTO `verne_admin_role_action` VALUES ('2', '4');
INSERT INTO `verne_admin_role_action` VALUES ('2', '5');
INSERT INTO `verne_admin_role_action` VALUES ('2', '7');
INSERT INTO `verne_admin_role_action` VALUES ('2', '8');
INSERT INTO `verne_admin_role_action` VALUES ('2', '9');
INSERT INTO `verne_admin_role_action` VALUES ('2', '10');
INSERT INTO `verne_admin_role_action` VALUES ('2', '11');
INSERT INTO `verne_admin_role_action` VALUES ('2', '13');
INSERT INTO `verne_admin_role_action` VALUES ('2', '14');
INSERT INTO `verne_admin_role_action` VALUES ('2', '15');
INSERT INTO `verne_admin_role_action` VALUES ('2', '16');
INSERT INTO `verne_admin_role_action` VALUES ('2', '17');
INSERT INTO `verne_admin_role_action` VALUES ('2', '18');
INSERT INTO `verne_admin_role_action` VALUES ('2', '19');
INSERT INTO `verne_admin_role_action` VALUES ('2', '20');
INSERT INTO `verne_admin_role_action` VALUES ('2', '21');
INSERT INTO `verne_admin_role_action` VALUES ('2', '22');
INSERT INTO `verne_admin_role_action` VALUES ('2', '24');
INSERT INTO `verne_admin_role_action` VALUES ('2', '25');
INSERT INTO `verne_admin_role_action` VALUES ('2', '27');
INSERT INTO `verne_admin_role_action` VALUES ('2', '28');
INSERT INTO `verne_admin_role_action` VALUES ('2', '29');
INSERT INTO `verne_admin_role_action` VALUES ('2', '30');
INSERT INTO `verne_admin_role_action` VALUES ('2', '31');
INSERT INTO `verne_admin_role_action` VALUES ('2', '33');
INSERT INTO `verne_admin_role_action` VALUES ('2', '34');
INSERT INTO `verne_admin_role_action` VALUES ('2', '35');
INSERT INTO `verne_admin_role_action` VALUES ('2', '36');
INSERT INTO `verne_admin_role_action` VALUES ('2', '37');
INSERT INTO `verne_admin_role_action` VALUES ('2', '38');
INSERT INTO `verne_admin_role_action` VALUES ('2', '39');
INSERT INTO `verne_admin_role_action` VALUES ('3', '3');
INSERT INTO `verne_admin_role_action` VALUES ('3', '4');
INSERT INTO `verne_admin_role_action` VALUES ('3', '9');
INSERT INTO `verne_admin_role_action` VALUES ('3', '13');
INSERT INTO `verne_admin_role_action` VALUES ('3', '14');
INSERT INTO `verne_admin_role_action` VALUES ('3', '15');
INSERT INTO `verne_admin_role_action` VALUES ('3', '16');
INSERT INTO `verne_admin_role_action` VALUES ('3', '17');
INSERT INTO `verne_admin_role_action` VALUES ('3', '18');
INSERT INTO `verne_admin_role_action` VALUES ('3', '19');
INSERT INTO `verne_admin_role_action` VALUES ('3', '20');
INSERT INTO `verne_admin_role_action` VALUES ('3', '21');
INSERT INTO `verne_admin_role_action` VALUES ('3', '22');
INSERT INTO `verne_admin_role_action` VALUES ('3', '24');
INSERT INTO `verne_admin_role_action` VALUES ('3', '25');
INSERT INTO `verne_admin_role_action` VALUES ('3', '27');
INSERT INTO `verne_admin_role_action` VALUES ('3', '28');
INSERT INTO `verne_admin_role_action` VALUES ('3', '29');
INSERT INTO `verne_admin_role_action` VALUES ('3', '30');
INSERT INTO `verne_admin_role_action` VALUES ('3', '31');
INSERT INTO `verne_admin_role_action` VALUES ('3', '33');
INSERT INTO `verne_admin_role_action` VALUES ('3', '34');
INSERT INTO `verne_admin_role_action` VALUES ('3', '35');
INSERT INTO `verne_admin_role_action` VALUES ('3', '36');
INSERT INTO `verne_admin_role_action` VALUES ('3', '37');
INSERT INTO `verne_admin_role_action` VALUES ('3', '38');
INSERT INTO `verne_admin_role_action` VALUES ('3', '39');
INSERT INTO `verne_admin_role_action` VALUES ('3', '41');
INSERT INTO `verne_admin_role_action` VALUES ('3', '42');
INSERT INTO `verne_admin_role_action` VALUES ('3', '43');
INSERT INTO `verne_admin_role_action` VALUES ('3', '44');
INSERT INTO `verne_admin_role_action` VALUES ('3', '45');
INSERT INTO `verne_admin_role_action` VALUES ('3', '47');
INSERT INTO `verne_admin_role_action` VALUES ('4', '3');
INSERT INTO `verne_admin_role_action` VALUES ('4', '4');
INSERT INTO `verne_admin_role_action` VALUES ('4', '13');
INSERT INTO `verne_admin_role_action` VALUES ('4', '14');
INSERT INTO `verne_admin_role_action` VALUES ('4', '15');
INSERT INTO `verne_admin_role_action` VALUES ('4', '16');
INSERT INTO `verne_admin_role_action` VALUES ('4', '17');
INSERT INTO `verne_admin_role_action` VALUES ('4', '18');
INSERT INTO `verne_admin_role_action` VALUES ('4', '19');
INSERT INTO `verne_admin_role_action` VALUES ('4', '20');
INSERT INTO `verne_admin_role_action` VALUES ('4', '21');
INSERT INTO `verne_admin_role_action` VALUES ('4', '22');
INSERT INTO `verne_admin_role_action` VALUES ('4', '27');
INSERT INTO `verne_admin_role_action` VALUES ('4', '28');
INSERT INTO `verne_admin_role_action` VALUES ('4', '29');
INSERT INTO `verne_admin_role_action` VALUES ('4', '30');
INSERT INTO `verne_admin_role_action` VALUES ('4', '31');
INSERT INTO `verne_admin_role_action` VALUES ('4', '41');
INSERT INTO `verne_admin_role_action` VALUES ('6', '3');
INSERT INTO `verne_admin_role_action` VALUES ('6', '4');
INSERT INTO `verne_admin_role_action` VALUES ('6', '13');
INSERT INTO `verne_admin_role_action` VALUES ('6', '14');
INSERT INTO `verne_admin_role_action` VALUES ('6', '15');
INSERT INTO `verne_admin_role_action` VALUES ('6', '19');
INSERT INTO `verne_admin_role_action` VALUES ('6', '20');
INSERT INTO `verne_admin_role_action` VALUES ('6', '21');
INSERT INTO `verne_admin_role_action` VALUES ('6', '22');
INSERT INTO `verne_admin_role_action` VALUES ('6', '27');
INSERT INTO `verne_admin_role_action` VALUES ('6', '28');
INSERT INTO `verne_admin_role_action` VALUES ('6', '29');
INSERT INTO `verne_admin_role_action` VALUES ('6', '30');
INSERT INTO `verne_admin_role_action` VALUES ('6', '31');
INSERT INTO `verne_admin_role_action` VALUES ('6', '41');
INSERT INTO `verne_admin_role_action` VALUES ('7', '3');
INSERT INTO `verne_admin_role_action` VALUES ('7', '13');
INSERT INTO `verne_admin_role_action` VALUES ('7', '14');
INSERT INTO `verne_admin_role_action` VALUES ('7', '15');
INSERT INTO `verne_admin_role_action` VALUES ('7', '16');
INSERT INTO `verne_admin_role_action` VALUES ('7', '17');
INSERT INTO `verne_admin_role_action` VALUES ('7', '18');
INSERT INTO `verne_admin_role_action` VALUES ('7', '19');
INSERT INTO `verne_admin_role_action` VALUES ('7', '20');
INSERT INTO `verne_admin_role_action` VALUES ('7', '21');
INSERT INTO `verne_admin_role_action` VALUES ('7', '22');
INSERT INTO `verne_admin_role_action` VALUES ('7', '27');
INSERT INTO `verne_admin_role_action` VALUES ('7', '28');
INSERT INTO `verne_admin_role_action` VALUES ('7', '29');
INSERT INTO `verne_admin_role_action` VALUES ('7', '30');
INSERT INTO `verne_admin_role_action` VALUES ('7', '31');
INSERT INTO `verne_admin_role_action` VALUES ('7', '33');
INSERT INTO `verne_admin_role_action` VALUES ('7', '34');
INSERT INTO `verne_admin_role_action` VALUES ('7', '35');
INSERT INTO `verne_admin_role_action` VALUES ('7', '36');
INSERT INTO `verne_admin_role_action` VALUES ('7', '37');
INSERT INTO `verne_admin_role_action` VALUES ('7', '38');
INSERT INTO `verne_admin_role_action` VALUES ('7', '39');
