export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--accent-gold)' }}>利用規約</h1>
      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第1条（適用）</h2>
          <p>本規約は、星詠み（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意した上で本サービスをご利用ください。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第2条（サービス内容）</h2>
          <p>本サービスは、数秘術をもとにAIが生成した今日の恋愛運勢をお届けするサブスクリプションサービスです。運勢の内容はエンターテインメント目的であり、特定の結果を保証するものではありません。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第3条（登録・アカウント）</h2>
          <p>ユーザーはメールアドレス、イニシャル、生年月日、性別を登録することでサービスをご利用いただけます。登録情報は正確な情報をご入力ください。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第4条（料金・サブスクリプション）</h2>
          <p>本サービスは登録日から7日間の無料トライアル期間終了後、月額500円（税込）のサブスクリプションが適用されます。料金はStripeを通じて毎月自動請求されます。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第5条（解約）</h2>
          <p>サブスクリプションはいつでも解約可能です。解約後は次回請求日まで引き続きサービスをご利用いただけます。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第6条（禁止事項）</h2>
          <p>以下の行為を禁止します。</p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: 'var(--text-muted)' }}>
            <li>虚偽の情報での登録</li>
            <li>他者のアカウントの無断使用</li>
            <li>本サービスの内容の無断転載・複製</li>
            <li>本サービスの運営を妨害する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第7条（免責事項）</h2>
          <p>本サービスが提供する運勢はエンターテインメント目的です。運勢の内容に基づいた行動の結果について、当サービスは一切の責任を負いません。</p>
        </section>

        <section>
          <h2 className="font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>第8条（規約の変更）</h2>
          <p>本規約は必要に応じて変更することがあります。変更後も本サービスをご利用された場合、変更後の規約に同意したものとみなします。</p>
        </section>

        <p className="text-xs mt-8" style={{ color: 'var(--text-muted)' }}>制定日：2026年4月23日</p>
      </div>
    </main>
  )
}
