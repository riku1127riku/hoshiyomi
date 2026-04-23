export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>プライバシーポリシー</h1>
      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>1. 収集する情報</h2>
          <p>本サービスでは以下の情報を収集します。</p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: 'var(--text-muted)' }}>
            <li>メールアドレス</li>
            <li>イニシャル</li>
            <li>生年月日</li>
            <li>性別</li>
            <li>決済情報（Stripeにて管理、当サービスでは保持しません）</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>2. 情報の利用目的</h2>
          <p>収集した情報は以下の目的に使用します。</p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: 'var(--text-muted)' }}>
            <li>運勢の生成・提供</li>
            <li>サービスの運営・改善</li>
            <li>サブスクリプションの管理</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>3. 第三者への提供</h2>
          <p>当サービスは、法令に基づく場合を除き、ユーザーの個人情報を第三者に提供しません。ただし、以下のサービスを利用しています。</p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: 'var(--text-muted)' }}>
            <li>Supabase（認証・データ管理）</li>
            <li>Stripe（決済処理）</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>4. セキュリティ</h2>
          <p>個人情報の漏洩・不正アクセスを防ぐため、適切なセキュリティ対策を講じています。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>5. 情報の削除・訂正</h2>
          <p>ご自身の個人情報の削除・訂正をご希望の場合は、お問い合わせページよりご連絡ください。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>6. ポリシーの変更</h2>
          <p>本ポリシーは必要に応じて変更することがあります。変更後はサービス内にてお知らせします。</p>
        </section>

        <p className="text-xs mt-8" style={{ color: 'var(--text-muted)' }}>制定日：2026年4月23日</p>
      </div>
    </main>
  )
}
