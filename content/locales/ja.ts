import type { Messages } from "../messages";

const messages = {
  technologyLabels: { dataVisualization: "データ可視化" },
  shell: { skip: "本文へ移動", backToTop: "ページ上部へ", footer: "J. Ha · フロントエンドエンジニア", portfolio: "ポートフォリオ" },
  roles: { "Frontend Engineer": "フロントエンドエンジニア", "Full-Stack Engineer": "フルスタックエンジニア", "Software Engineer": "ソフトウェアエンジニア" },
  metadata: {
    home: { title: "J. Ha | フロントエンドエンジニア", description: "安定して使えるWebアプリケーションを目指すフロントエンドエンジニア。React、TypeScript、API連携、既存アプリケーションの保守に取り組みます。" },
    work: { title: "職務経歴 | J. Ha", description: "フロントエンド開発、アプリケーション開発・保守、不具合調査の職務経歴。" },
    lab: { title: "Lab | J. Ha", description: "J. Haのフロントエンド個人プロジェクト。" },
    detail: { title: "API Rescue Lab | J. Ha", description: "応答の遅延、失敗、不正なデータに対処するフロントエンドの動作を、サンプルタスクのローカルシミュレーションで体験できます。" },
  },
  home: {
    greeting: "こんにちは、J. Haです · フロントエンドエンジニア",
    headline: "安定して使えるWebアプリケーションを目指すフロントエンドエンジニア。",
    introduction: "フロントエンドアプリケーションの開発、保守、不具合調査に取り組んでいます。React、TypeScript、API連携、AWS・サーバーレス環境、稼働中の既存コードベースでの経験があります。",
    viewWork: "職務経歴を見る", exploreLab: "Labを見る", workEyebrow: "01 / 職務経歴", experienceTitle: "主な開発経験", allWork: "すべての職務経歴を見る",
    labEyebrow: "02 / 個人プロジェクト", labTitle: "注目のLab", viewLab: "Lab一覧へ", aboutEyebrow: "03 / 自己紹介", aboutTitle: "フロントエンドを中心に、既存システムにも対応。",
    about: "主に日本で約9年の実務経験を持つ、フロントエンドを中心としたソフトウェアエンジニアです。既存コードを要件と照合し、画面配置の処理と業務ロジックを区別して実装を考えます。JavaScriptの配置計算をCSSに置き換えてデスクトップ・モバイル・タブレットに対応した経験や、フロントエンド全体へのTypeScript導入でビルド段階の型エラー検出につなげた経験があります。",
    portfolioStack: "このポートフォリオはNext.js、React、TypeScriptで制作しています。",
    skills: { frontend: "フロントエンド", integration: "連携・実装経験", practice: "開発実務", practiceItems: "既存アプリケーションの保守、不具合調査、単体テスト、結合テスト支援、Git" },
    workflowTitle: "仕事の進め方",
    workflow: [
      { title: "理解", text: "コードを読み、現在の動作を追います。" },
      { title: "再現", text: "問題が発生する条件を確認します。" },
      { title: "修正", text: "原因のある箇所に、必要な変更を加えます。" },
      { title: "検証", text: "意図した動作と、関連する失敗ケースを確認します。" },
    ],
    contactEyebrow: "04 / お問い合わせ", contactTitle: "アプリケーションの開発・改善についてご相談ください。", contactText: "案件のご相談や詳しい職務経歴については、このポートフォリオをお送りした連絡先でお問い合わせください。",
  },
  work: {
    eyebrow: "職務経歴", title: "職務経歴", introduction: "フロントエンド開発、アプリケーション保守、不具合調査の経験を業務の種類でまとめています。期間は年単位で表示し、会社名と正確な月は公開していません。", employment: "在籍期間", selectedWork: "主な担当業務", project: "プロジェクト期間",
    contexts: { experience1: "業務Webアプリケーション開発", experience2: "サーバーレスWeb開発", experience3: "データ分析画面の開発", experience4: "業務アプリケーションの保守" },
    items: {
      dataAnalytics: { title: "データ分析プラットフォーム", description: "社内データサイエンティストの前処理用に、Reactでインタラクティブなグラフ画面を開発しました。ユーザー操作に応じて表示を変えるようカスタマイズし、社内利用者からデータが見やすくなったとの評価を受けました。当時は実顧客の利用はなく、社内での利用・評価段階でした。JavaScriptで書かれたフロントエンド全体にTypeScriptを導入し、ビルド段階での型エラー検出とコードの把握しやすさにつなげました。時系列可視化コンポーネントの開発とBIソリューションのカスタマイズも担当しました。" },
      hvac: { title: "空調監視・管理システム", description: "Python・AWS Lambdaのサービスと連携する、Angularベースの空調監視・管理システムを開発・保守しました。Angularフロントエンドのアップグレード、監視機能の追加、機器と管理システム間の通信プロトコルの不具合解決を担当しました。" },
      existingBusiness: { title: "既存の業務Webアプリケーション", description: "環境・ブラウザーに関する対応で画面を検証しました。JavaScript、PL/SQL、HTML、CSSのコードを追って不具合を調査し、特定した問題を修正しました。" },
      redevelopment: { title: "業務Webアプリケーションの再開発", description: "ローコード環境でフロントエンドとバックエンドのカスタムロジックを実装し、単体テストと結合テスト支援を担当しました。自動生成HTMLを設計書と照合し、不要な要素や複雑な構造をカスタマイズしました。カードUIでは配置用JavaScriptの計算・条件処理が複雑で、モバイルでレイアウトが崩れる場合がありました。配置処理をCSSに置き換え、デスクトップ・モバイル・タブレットに共通の実装で対応しました。業務ロジックが読み取りやすくなり、頻繁な設計変更への対応と保守がしやすくなりました。別のエンジニアからソースコードの簡潔さを評価され、参考にされました。技術スタックは顧客側で決定済みであり、担当画面の実装方法を判断しました。" },
      webDevelopment: { title: "Webアプリケーション開発", description: "AWS Amplify・Serverless Frameworkを使ったWebアプリケーションを開発し、認証関連、ユーザー管理、マルチメディア機能を実装しました。コードレビューを通じてチームと協働しました。" },
      platformMaintenance: { title: "社内プラットフォームの保守", description: "社内のデータマイニングプラットフォームを保守しました。" },
      systemMaintenance: { title: "既存システムの保守・移行", description: "保険営業向けWindowsタブレットシステムと既存の業務アプリケーションを保守しました。Windows 10への移行を支援し、単体テストのドキュメントを作成しました。" },
    },
  },
  lab: {
    eyebrow: "個人プロジェクト", title: "Lab", introduction: "遅い応答、失敗、不正なデータに対処しながら、タスク一覧と状況を分かりやすく表示するフロントエンドのシミュレーションです。", projects: "プロジェクト", cardOverline: "個人プロジェクト · ローカルシミュレーション / サンプルデータ",
    homeSummary: "APIが遅い、失敗する、不正なデータを返す状況でも、フロントエンドが使える画面を保つ動作を体験できます。", indexSummary: "サンプルタスクを使ったローカルシミュレーションで、4種類の応答条件を試せます。結果の検証、失敗への対処、読み込み済みのタスクを保持する動作を確認できます。", openProject: "プロジェクトを開く",
  },
  detail: {
    back: "Labに戻る", eyebrow: "個人プロジェクト · ローカルシミュレーション / サンプルデータ", introduction: "応答が遅い、失敗する、不正なデータを含む場合でも、利用者には明確な状況表示と、読み込み済みの有効なタスクが必要です。", instruction: "「正常」を実行し、失敗を試した後、もう一度「正常」を実行してください。", simulation: "操作できるシミュレーション", simulator: "シミュレーター", demonstrates: "このデモで確認できること",
    demonstrations: ["応答とスキーマを検証し、不正なタスクの応答を画面に表示する前に拒否します。", "失敗しても、以前読み込んだ有効なタスクを保持します。一度も読み込めていない場合は空の状態を表示します。", "古いリクエストの完了結果が新しい状態を上書きしないことを、reducerのテストで検証します。", "タイムアウトや失敗の理由を説明し、再試行や復旧の手順を明確にします。"],
    stepsTitle: "4つの手順で試す", steps: ["「正常」を実行して、検証済みのサンプルタスクを読み込みます。", "「不正なデータ」または「サーバーエラー」を実行し、状況表示と保持されたタスクを確認します。", "「遅い応答」を実行します。4秒後に応答する設定ですが、2秒でタイムアウトします。", "「正常」を選び、もう一度実行して復旧します。"], retry: "再試行では、選択した失敗条件をもう一度実行します。",
    evidence: {
      title: "実装の確認",
      observable: "デモでは読み込み、タイムアウト、サーバーエラー、不正なデータ、タスクの保持、再試行、「正常」での復旧を体験できます。",
      tested: "リクエストIDにより古い完了結果や順序が入れ替わった完了結果を拒否することは、reducerのテストで検証しています。デモでリクエストを重ねて実行するシナリオではなく、コードのテストで確認する保証です。",
    },
  },
} satisfies Messages;

export default messages;
