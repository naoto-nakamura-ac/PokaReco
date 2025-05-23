# PocaReco
![ロゴ](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/top.png)

# アプリURL
https://pokareco.onrender.com/

# サービス概要
体温、身長、体重を入力し、グラフで確認できる育児記録アプリです<br>
体温測定（ポカポカ/PokaPoka）と記録（Record）をかけた名前にしてます
# アプリを作ったきっかけ
本格的にフルスタックエンジニアとなるべく学習を始めて約１カ月が経ちました。<br>
この度、１カ月でどれだけのスキルが身についたのか実力を試してみたいと思い、兼ねてから構想していた育児記録アプリに開発に取り組みました。

# アプリに込めた思い・実現したい未来
このアプリはまだまだ発展途上です。
しかし、育児を頑張るパパママに役に立てるアプリとなるよう鋭意開発を続けていきます。<br>
PokaRecoを使うことで我が子が急に発熱した時でも即座に熱型表をエクスポートし、病院受診時に役立ててもらえると嬉しいです。

# 主なページと機能
| Topページ |	ログインページ |
| ---- | ---- |
| ![appTop](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_top.png) | ![login](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_login.png) |
| Topページは暖かい雰囲気をイメージした配色にしました。はじめるを押すとお試しで作ってみたローディングアニメーションが流れます。<br>|入力に不足があると、各フォームの下にエラーメッセージを表示することで、ユーザーにわかりやすい設計を意識しました。<br>一度ログインするとトークンにセッションが記録されるので一定時間であればログイン状態が保持されます |

| 新規登録ページ | ダッシュボードページ |
| ---- | ---- |
| ![register](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_register.png) | ![dashboard](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_dash.png) |
| 新規登録画面でも入力に不足があるとエラーで教えてくれます | メインページになります。<br>親（自分）の情報や子供の情報、メイン機能へのリンクボタン、直近1週間の体温を記録したグラフを確認できます。<br>外部APIのお試しとして名古屋市の天気を表示させています。ハンバーガーメニューから子供の登録、削除、ログアウトができます

| 記録ページ | 確認ページ |
| ---- | ---- |
| ![log](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_log.png) | ![check](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_check.png) |
| 記録したい情報を日単位で入力できます。記録日は過去に遡って入力可能です。時間帯も指定できます。身長や体重の入力後、フリーメモ欄があるので自由にコメントできます。 | こちらでは今まで記録した全期間のデータをグラフとして描画します|

| 出力ページ | 子供追加ダイアログ |
| ---- | ---- |
| ![export](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_export.png) | ![add](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/app_add.png)|
| 病院受診時に体温の推移を提出できるようにグラフを簡易熱型表としてPDF出力しダウンロードできます | ダッシュボードページの子供を追加する、から登録できます。|

# 使用技術
## バックエンド
- Node.js v22.14.0
- Express ^5.1.0
- Javascript

## フロントエンド
- React ^19.1.0
- HTML
- Javascript
- YamadaUI

## データベース
- Postgresql 14

# DB Schema
![db](https://raw.githubusercontent.com/naoto-nakamura-ac/PokaReco/assets/images/pokareco_schema.png)

# Setup
1. リポジトリをローカル環境にCloneする
    ```bash
    git clone https://github.com/naoto-nakamura-ac/PokaReco.git
    ```
  -  **Node.js or Postgres はインストール、セットアップ済み前提**
2. ルートディレクトリでバックエンドのライブラリをインストールする
    ```bash
    npm install
    ```
3. front ディレクトリでフロントエンドのライブラリをインストールする
    ```bash
    cd front
    npm install
    ```
4. ルートディレクトリに.envファイルを作成する
    ```js
    NODE_ENV='development'
    ```
5. ビルドする
    ```bash
    nom run build
    ```
    - **frontをビルド後、/publicフォルダにコピーしてExpressにてホスティングします**

# 