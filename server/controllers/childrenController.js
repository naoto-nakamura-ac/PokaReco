const Children = require('../models/Children');

const validation = (...args) => {
  return args.every((element) => element);
};

const addChild = async (req, res) => {
  try {
    const { name, birthday, gender } = req.body;
    if (!validation(name, birthday, gender)) {
      return res.status(400).json({ message: 'フィールドが欠損しています' });
    }

    // #TODO 子供の複数人対応
    const exitChild = await Children.findChildren(req.user.id);
    if (exitChild.length > 0) {
      return res
        .status(400)
        .json({ message: '今は一人しか追加できません！今はね。。。' });
    }

    const newChild = await Children.insChild({
      user_id: req.user.id,
      name,
      birthday,
      gender,
    });
    return res.status(201).json({
      message: '子供の追加に成功しました',
      newChildName: newChild[0].name,
    });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteChild = async (req, res) => {
  try {
    const exitChild = await Children.findChildren(req.user.id);
    if (exitChild.length === 0) {
      return res.status(400).json({ message: '子供が登録されていません' });
    }
    await Children.delChild(exitChild[0].id);
    return res.status(201).json({ message: '子供を削除しました' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getChildren = async (req, res) => {
  const children = await Children.findChildren(req.user.id);
  return res.status(200).json(children);
};
module.exports = { addChild, deleteChild, getChildren };
