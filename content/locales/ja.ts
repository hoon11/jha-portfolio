import type { Messages } from "../messages";

const messages = {
  technologyLabels: { dataVisualization: "データ可視化" },
  shell: { skip: "本文へ移動", backToTop: "ページ上部へ", footer: "J. H. · フロントエンドエンジニア", portfolio: "ポートフォリオ" },
  roles: { "Frontend Engineer": "フロントエンドエンジニア", "Full-Stack Engineer": "フルスタックエンジニア", "Software Engineer": "ソフトウェアエンジニア" },
  metadata: {
    home: { title: "J. H. | フロントエンドエンジニア", description: "安定して使えるWebアプリケーションを目指すフロントエンドエンジニア。React、TypeScript、API連携、既存アプリケーションの保守に取り組みます。" },
    work: { title: "職務経歴 | J. H.", description: "フロントエンド開発、アプリケーション開発・保守、不具合調査の職務経歴。" },
    lab: { title: "Lab | J. H.", description: "J. H.のフロントエンド個人プロジェクト。" },
    detail: { title: "API Rescue Lab | J. H.", description: "応答の遅延、失敗、不正なデータに対処するフロントエンドの動作を、サンプルタスクのローカルシミュレーションで体験できます。" },
  },
  home: {
    greeting: "こんにちは、J. H.です · フロントエンドエンジニア",
    headline: "安定して使えるWebアプリケーションを目指すフロントエンドエンジニア。",
    introduction: "React・TypeScript・Angularを軸に、Webアプリケーションの開発・保守に取り組んでいます。既存仕様・コード・DBから問題を切り分け、解決に必要なAPI・バックエンド・AWSまで調べて実装します。",
    viewWork: "職務経歴を見る", exploreLab: "Labを見る", workEyebrow: "01 / 職務経歴", experienceTitle: "主な開発経験", allWork: "すべての職務経歴を見る",
    labEyebrow: "02 / 個人プロジェクト", labTitle: "注目のLab", viewLab: "Lab一覧へ", aboutEyebrow: "03 / 自己紹介", aboutTitle: "フロントエンドを中心に、既存システムにも対応。",
    about: "主に日本で約9年の実務経験を持つ、フロントエンドを中心としたソフトウェアエンジニアです。仕様・既存コード・DBを照合し、曖昧点を確認してから実装を進めます。複雑なカードUIの配置計算をCSS Grid・Flexに見直し、Webpackで既存JavaScriptとの共存を実証してTypeScriptの段階導入を提案しました。デバッグや調査方法を同僚に共有し、自力で開発を進められるよう支援しています。",
    portfolioStack: "このポートフォリオはNext.js、React、TypeScriptで制作しています。",
    skills: { frontend: "フロントエンド", integration: "連携・実装経験", practice: "開発実務", practiceItems: "既存アプリケーションの保守、不具合調査、単体テスト、結合テスト支援、Git", certification: "保有資格" },
    workflowTitle: "仕事の進め方",
    workflow: [
      { title: "理解", text: "仕様・コード・DB制約を照合し、不整合や曖昧点を確認します。" },
      { title: "再現", text: "問題が発生する条件を確認します。" },
      { title: "修正", text: "原因のある箇所に、必要な変更を加えます。" },
      { title: "検証", text: "意図した動作と、関連する失敗ケースを確認します。" },
    ],
    contactEyebrow: "04 / お問い合わせ", contactTitle: "アプリケーションの開発・改善についてご相談ください。", contactText: "案件のご相談や詳しい職務経歴については、このポートフォリオをお送りした連絡先でお問い合わせください。",
  },
  work: {
    eyebrow: "職務経歴", title: "職務経歴", introduction: "フロントエンド開発、アプリケーション保守、不具合調査の経験を業務の種類でまとめています。期間は年単位で表示し、会社名と正確な月は公開していません。", employment: "在籍期間", selectedWork: "主な担当業務", project: "プロジェクト期間",
    contexts: { experience1: "業務Webアプリケーション開発", experience2: "サーバーレスWeb開発", experience3: "データ分析画面の開発", experience4: "業務アプリケーションの保守" },
    currentActivity: {
      title: "休養と業務復帰に向けた準備",
      careerBreak: "直近の実務案件が終了した後、体調不良のため休養しました。会社には翌年まで在籍していました。",
      preparation: "技術学習と個人開発を通じて業務復帰の準備をしています。React・TypeScriptを使ったこのポートフォリオとAPI Rescue Labを制作し、下記のAWS認定資格を取得しました。",
    },
    items: {
      businessMaintenance: { title: "既存業務システムの改修", description: "Java・Springによる既存業務システムの改修と、jQueryによる予算管理画面の実装を担当しました。" },
      biReporting: { title: "BIレポート画面開発・保守", description: "PHPによる業務用レポート画面を実装し、データ検索・表示速度の改善とBIソリューションJedoxの保守を担当しました。" },
      assetApi: { title: "IT資産管理システムのAPI開発", description: "DBテーブル定義・ER図、SwaggerによるAPI仕様書、PlantUMLによるシーケンス図を作成しました。他メンバーの助言を受けながら設計を具体化し、資料を実装・レビューの基準として使用。TypeScript・Node.jsによるAPI実装とJestの単体テストコード作成まで担当しました。" },
      dataAnalytics: { title: "データ分析プラットフォーム", description: "Reactによる時系列可視化機能の開発・保守と、社内データサイエンティストの前処理用グラフ画面を担当しました。新規機能からTypeScriptを段階導入する案を提案し、Webpack設定を変更して既存JavaScriptとの共存を実証。チームで採用され、型チェックによる実装エラーの早期発見にも役立ちました。既存EC2への変更を抑えるAWS ALB構成を調査し、証明書・ルーティング設定を含むHTTPS対応も実施。可視化機能の実現に必要なPythonバックエンド処理も確認・修正しました。" },
      hvac: { title: "空調監視・管理システム", description: "Python・AWS Lambdaのサービスと連携するAngularベースの空調監視・管理システムを開発・保守しました。Angularのアップグレード、監視機能の追加、機器と管理システム間の通信プロトコルの不具合調査・修正を担当。Python・AWS Lambdaによるバックエンド作業と、サービス連携を含む改修にも対応しました。" },
      existingBusiness: { title: "既存の業務Webアプリケーション", description: "IEからEdgeへの移行に伴い画面を検証しました。既存仕様とJavaScript・PL/SQL・HTML・CSSのソースコードから原因と修正箇所を特定し、不具合修正・検証、結合テストに対応しました。" },
      redevelopment: { title: "業務Webアプリケーションの再開発", description: "ローコード環境でフロントエンド・バックエンドのカスタムロジック実装、単体テスト、結合テスト支援を担当しました。類似画面・設計書・既存コード・DB制約を照合し、計算式や文字列長の不一致を設計担当者と確認・修正して設計書にも反映。複雑なJavaScriptのカード配置制御をCSS Grid・Flex中心に見直し、PC・タブレット・スマートフォンに共通で対応しました。画面配置と業務ロジックを分離して設計変更・保守をしやすくし、他メンバーも類似画面で応用。新卒メンバーにはデバッグや調査方法を共有し、担当画面を自力で進められるよう支援しました。" },
      webDevelopment: { title: "医療関連アプリの管理サイト開発", description: "先任者が整理した要求に沿い、Vue.js・Nuxtでクリニック向けの権限設定、患者・検査情報の管理画面を実装しました。Cognitoによる会員管理・認証、LambdaによるGraphQL・REST API、動画・音声再生、DynamoDBを考慮したページネーションも担当。コードレビューに参加し、Webアプリ開発でServerless Frameworkも利用しました。" },
      platformMaintenance: { title: "社内プラットフォームの保守", description: "社内のデータマイニングプラットフォームを保守しました。" },
      systemMaintenance: { title: "既存システムの保守・移行支援", description: "保険営業用Windowsタブレットシステムの保守・運用とWindows 10への移行を支援しました。設計書に沿ったテスト、操作マニュアル・単体テスト文書の作成、ブラウザー・Windows・レジストリ設定の調査にも対応しました。" },
    },
  },
  lab: {
    eyebrow: "個人プロジェクト", title: "Lab", introduction: "APIのエラー対応、データ操作、空調サービスのコンセプトを試せるフロントエンドの個人プロジェクトを紹介します。", projects: "プロジェクト", cardOverline: "個人プロジェクト · ローカルシミュレーション / サンプルデータ",
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
