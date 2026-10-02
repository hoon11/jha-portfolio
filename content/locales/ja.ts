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
    about: "主に日本で約9年の実務経験を持つ、フロントエンドを中心としたソフトウェアエンジニアです。データを多く扱う画面、監視アプリケーション、アップグレード、本番環境の不具合調査を経験してきました。",
    portfolioStack: "このポートフォリオはNext.js、React、TypeScriptで制作しています。",
    skills: { frontend: "フロントエンド", integration: "連携・実装経験", practice: "開発実務", practiceItems: "既存アプリケーションの保守、不具合調査、単体テスト、結合テスト支援、Git" },
    workflowTitle: "仕事の進め方",
    workflow: [
      { title: "理解", text: "コードを読み、現在の動作を追います。" },
      { title: "再現", text: "問題が発生する条件を確認します。" },
      { title: "修正", text: "原因のある箇所に、必要な変更を加えます。" },
      { title: "検証", text: "意図した動作と、関連する失敗ケースを確認します。" },
    ],
    contactEyebrow: "04 / お問い合わせ", contactTitle: "アプリケーションの開発・改善についてご相談ください。", contactText: "フロントエンド開発、保守、既存コードベースの問題について、メールまたはLinkedInからご連絡ください。", email: "J. Haにメールする",
  },
  work: {
    eyebrow: "職務経歴", title: "職務経歴", introduction: "既存システムでのフロントエンド開発、アプリケーション保守、不具合調査の経験。", employment: "在籍期間", selectedWork: "主な担当業務", project: "プロジェクト期間",
    items: {
      dataAnalytics: { title: "データ分析プラットフォーム", description: "データ分析プラットフォームのReact・TypeScriptによる画面を開発・保守しました。時系列データの可視化コンポーネント開発や、BIソリューションのカスタマイズを担当しました。" },
      hvac: { title: "空調監視・管理システム", description: "Python・AWS Lambdaのサービスと連携する、Angularベースの空調監視・管理システムを開発・保守しました。Angularフロントエンドのアップグレード、監視機能の追加、機器と管理システム間の通信プロトコルの不具合解決を担当しました。" },
      existingBusiness: { title: "既存の業務Webアプリケーション", description: "環境・ブラウザーに関する対応で約150画面を検証しました。JavaScript、PL/SQL、HTML、CSSのコードを追って不具合を調査し、特定した問題を修正しました。" },
      redevelopment: { title: "業務Webアプリケーションの再開発", description: "既存の業務Webアプリケーションの再開発に参加しました。フロントエンドとバックエンドのカスタムロジックを実装し、単体テストと結合テスト支援を担当しました。" },
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
    demonstrations: ["応答とスキーマを検証し、不正なタスクの応答を画面に表示する前に拒否します。", "失敗しても、以前読み込んだ有効なタスクを保持します。一度も読み込めていない場合は空の状態を表示します。", "古いリクエストの完了結果が新しい状態を上書きすることを防ぎます。", "タイムアウトや失敗の理由を説明し、再試行や復旧の手順を明確にします。"],
    stepsTitle: "4つの手順で試す", steps: ["「正常」を実行して、検証済みのサンプルタスクを読み込みます。", "「不正なデータ」または「サーバーエラー」を実行し、状況表示と保持されたタスクを確認します。", "「遅い応答」を実行します。4秒後に応答する設定ですが、2秒でタイムアウトします。", "「正常」を選び、もう一度実行して復旧します。"], retry: "再試行では、選択した失敗条件をもう一度実行します。",
  },
} satisfies Messages;

export default messages;
