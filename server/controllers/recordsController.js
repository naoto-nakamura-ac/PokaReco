const Children = require('../models/Children');
const Records = require('../models/Records');

const validation = (...args) => {
  return args.every((element) => element);
};

const addRecord = async (req, res) => {
  try {
    const { record_date, timeframe, temperature, height, weight, memo } =
      req.body;

    if (!validation(record_date, timeframe)) {
      return res.status(400).json({ message: 'フィールドが欠損しています' });
    }
    // #TODO 子供が複数になった時にクライアントからchild_idを送信する仕組みにする
    // なのでここは必要なくなる、もしくはすべて子供データを取得後にchild_idで照合する
    const exitChild = await Children.findChildren(req.user.id);
    if (exitChild.length === 0) {
      return res.status(400).json({ message: '子供が登録されていません' });
    }
    await Records.insRecord({
      child_id: exitChild[0].id,
      record_date,
      timeframe,
      temperature,
      height,
      weight,
      memo,
    });
    return res.status(201).json({ message: 'レコードの追加に成功しました' });
  } catch (error) {
    console.log('error: ', error);
    if (error.code === '23505') { // postgreで一意性制約があった場合に返るエラーコード
      return res.status(409).json({ message: 'すでに同じ記録が存在します' });
    }
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getRecords = async (req, res) => {
  try {
    // #TODO 子供が複数になった時にクライアントからchild_idを送信する仕組みにする
    const exitChild = await Children.findChildren(req.user.id);
    if (exitChild.length === 0) {
      return res.status(400).json({ message: '子供が登録されていません' });
    }
    
    const child_id = exitChild[0].id;
    const { start, end } = req.query;
    let records;
    if (start && end) {
      // 期間指定
      // 何も引っかからなかった場合は空配列がrecordsに格納される
      records = await Records.findRecordsRange(child_id, start, end);
    } else {
      // 全件取得
      records = await Records.findRecordsAll(child_id);
    }

    return res.status(200).json(records);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addRecord, getRecords };
