import React, { useEffect, useMemo, useRef, useState } from 'react';

/* =====================================================
   言語
===================================================== */
type Lang = 'ja' | 'en';

const en = {
  // Header
  nav_service: 'SERVICE',
  nav_about: 'ABOUT US',
  nav_greeting: 'FOUNDER',
  nav_company: 'COMPANY',
  nav_contact: 'CONTACT',

  // Brand
  brand: 'Kokualoha',

  // Hero
  hero_title_line1: 'In Hawaii, meet a new you,',
  hero_title_line2: 'and rediscover Japan’s timeless beauty.',

  // About (short + long)
  about_title: 'ABOUT US',
  about_desc:
    'We provide reliable, locally rooted concierge support in Hawaii with a focus on “Made in Hawaii.”',
  about_desc_long: `There are unseen pitfalls to living abroad. In Hawaii as well, there was once a belief that “if it’s run by Japanese, you can trust it.” Sadly, that myth has faded, and people sometimes face unexpected problems.

While Japanese-language services have increased, prices are often higher than local rates, and the old sense of security in “Japanese-managed” businesses has weakened. At the same time, platforms like Google and Yelp matter, yet businesses that serve only Japanese customers tend not to appear in those arenas.

We face this reality and, together with local experts, guide guests towards truly valuable experiences with an emphasis on genuine “Made in Hawaii.” We don’t want to introduce only Japanese-run shops, but also share Hawaii’s original, authentic charm. Our aim is to help people step beyond a Japan-only bubble and coexist with the local community.

Even school choices can become insular—following where “someone’s friend is going,” which can lead to a loss of diversity. Some people rely on a casually met resident for help, only to encounter trouble due to insufficient knowledge or experience. Goodwill is not the same as expertise, and mistaking one for the other can have serious consequences.

At Kokualoha, a team handles each case. If an issue arises, we find a way forward, take responsibility, and accompany our clients through to resolution. We value organizational reliability and accountability over individual goodwill.`,

  // Founder greeting
  greeting_title: 'Message from the Founder',
  greeting_name: 'Musashi International, Inc 代表取締役社長 塩田 武左史',
  greeting_body_long: `I have lived in Hawaii for 30 years. I came here alone as a university student, and while working various part-time jobs, I eventually found my path in business: first the golf industry, then a years-long career in real estate, and now into the travel and concierge fields.

Throughout this time, my strongest desire has been to support the Japanese community. From the bubble era when Japanese investors poured into Hawaii, through the waves of economic change, I have seen both successes and difficulties. Yet I have continued to walk alongside our clients, from students and families to entrepreneurs and long-stay residents. We have carried on even through the pandemic with the support of locals and guests.

I’m also involved with “Music Band,” the only activity in Hawaii that teaches music to children with disabilities. More recently, I’ve taken on a new challenge: entrusted by Japanese investors to operate a long-standing karaoke venue—another new challenge.

One of our signature tours is the Pearl Harbor Historical Tour. We cherish the history of Japanese Americans and the sacrifices and efforts of those who came before us. We see it as our mission to share why Hawaii remains so beloved by Japanese, and to help guests truly feel that connection. Delivering experiences that stay in the heart—beyond mere sightseeing—is our pride.`,

  // Service
  service_title: 'SERVICE',
  service_subtitle: 'What We Offer',
  service_note_more:
    'We also arrange professional appointments, immigration support, bespoke tours and golf.',
  svc1_title: 'Japanese Support',
  svc1_desc:
    'Bilingual help via LINE/phone/app; translation for documents and daily procedures.',
  svc2_title: 'Medical Support',
  svc2_desc:
    'Introduce Japanese-speaking doctors, make appointments, accompany as interpreter.',
  svc3_title: 'Loss & Theft Assistance',
  svc3_desc:
    'Guide passport/credit reissue and embassy contact; support police procedures.',
  svc4_title: 'Legal Consultation',
  svc4_desc:
    'Connect you with attorneys; explain cultural/legal differences and next steps.',
  svc5_title: 'Home & Vehicle Care',
  svc5_desc:
    'House/vehicle check, airport pickup, bill payment, mail check—before/after stays.',
  svc6_title: 'Utilities & IDs',
  svc6_desc:
    'Open utilities/mobile, state certificates, driver’s license, SSN procedures.',

  // Company
  company_title: 'COMPANY',
  company_name: 'Kokualoha',
  company_desc:
    'Concierge & coordination for residents, investors and travelers — rooted in Hawaii.',

  // Contact
  contact_title: 'CONTACT',
  contact_subtitle: 'Tell us your ideal stay or concern',
  contact_name: 'Name',
  contact_email: 'Email',
  contact_phone: 'Phone',
  contact_message: 'Message',
  contact_send: 'Send',

  // Footer
  footer_rights: 'All Rights Reserved.',
  footer_copyright: '© Kokualoha',
} as const;

type Keys = keyof typeof en;

const ja: Record<Keys, string> = {
  nav_service: 'サービス',
  nav_about: '私たちについて',
  nav_greeting: '代表挨拶',
  nav_company: '会社情報',
  nav_contact: 'お問い合わせ',

  brand: 'コクアロハ',

  // Hero
  hero_title_line1: 'ハワイで出会う新しい自分、',
  hero_title_line2: '忘れていた日本の素晴らしさ。',

  about_title: '私たちについて',
  about_desc:
    'Made in Hawaii を大切に、現地に根差した信頼できるコンシェルジュサポートをご提供します。',
  about_desc_long: `海外生活には、見えない落とし穴が存在します。ここハワイでも、かつては「日本人だから安心できる」という信頼がありましたが、残念ながら今はその神話が崩れ、思わぬ被害に遭うケースが少なくありません。

日本語でのサービスは増えましたが、料金はローカルより高く、「日本人が経営しているから大丈夫」という安心感も薄れつつあります。アメリカ社会では Google や Yelp などの口コミが厳しくチェックされますが、日本人だけを対象にした事業者は、そうした評価の場に出てこないことも多いのが現状です。

私たちはこの現実を直視し、ローカルの専門家と共に、本当に価値のある “Made in Hawaii” を大切にしたご案内を行っています。日本人経営のお店だけでなく、ハワイ本来の魅力を感じていただける場所をご紹介し、「日本人だけの世界」から一歩外に踏み出すお手伝いをしたいと考えています。

学校選びひとつでも「○○ちゃんが行くから」と同じ選択に偏り、多様性が失われることがあります。たまたま知り合った在住日本人に頼み、知識や経験不足からトラブルになるケースも少なくありません。人の善意と専門性は別物であり、見誤ると深刻な結果につながり得ます。

コクアロハでは、一つの案件をチームで遂行します。問題があれば必ず打開策を見つけ、責任をもってご案内します。個人の善意に頼るのではなく、組織としての信頼と責任を重視します。`,

  greeting_title: '代表挨拶',
  greeting_name: 'Musashi International, Inc 代表取締役社長 塩田 武左史',
  greeting_body_long: `私はハワイに暮らして30年になります。留学を目的に単身でハワイの大学へ入学し、学生生活を送りながら様々な仕事に携わってきました。ゴルフ業界、不動産業界を経て、現在は旅行・コンシェルジュ業へとフィールドを広げております。

これまで一貫して大切にしてきたのは、「日本人の方々の力になりたい」という思いです。バブル期の投資ブームから、経済の変動、パンデミックを含む幾度もの転換期を見てきました。その中で、留学生やご家族、長期滞在者や投資家の方々など、さまざまなお客様と関わり、一緒に課題を乗り越えてきました。

ハワイでの暮らしは、決してきれいな部分だけではありません。トラブルや不安、言葉の壁、文化の違いなど、想像もしなかった出来事に直面することもあります。そのような時にこそ、「現地で本当に頼れる存在」が必要だと感じています。私たちは、単に利便性を提供するだけでなく、お客様の背景や想いを理解したうえで、最適な選択肢をご提案することを心がけています。

また、個人的にはハワイで唯一、障害をもつ子どもたちに音楽を教える「Music Band 」の活動にも携わっております。さらに近年は、日本の投資家から老舗カラオケ店の運営を託され、新たな挑戦も始めました。

私たちの代表的なツアーのひとつに「真珠湾ヒストリカルツアー」があります。日系人の努力や犠牲の歴史を大切に伝え、なぜハワイが日本人にとって特別な場所であり続けるのかを、お客様と分かち合うことを使命としています。観光だけで終わらない“心に残る体験”をお届けすることこそ、私たちの誇りです。`,

  service_title: 'サービス',
  service_subtitle: '提供メニュー',
  service_note_more:
    '弁護士・会計士・銀行など各種アポイント、ビザ/移民手続き、オーダーメイド観光やゴルフ手配も承ります。',
  svc1_title: '日本語サポート',
  svc1_desc:
    'LINE・電話・アプリでの日本語＋現地語対応、各種書類や手続きの翻訳・通訳。',
  svc2_title: '医療サポート',
  svc2_desc:
    '日本語対応医師のご紹介・予約、必要に応じて同行や通訳も対応。',
  svc3_title: '紛失・盗難時の支援',
  svc3_desc:
    'パスポート/カード再発行、在外公館や警察手続きのサポート。',
  svc4_title: '法律相談',
  svc4_desc:
    '弁護士のご紹介、文化・法律の違いの解説、対応方針の整理。',
  svc5_title: '住まい・車の管理',
  svc5_desc:
    'お部屋・車の点検、空港送迎、公共料金や郵便の確認など滞在前後のケア。',
  svc6_title: '公共料金・ID手続き',
  svc6_desc:
    '通信/水道/電気の開設、州の証明書、運転免許・SSN 取得の支援。',

  company_title: '会社情報',
  company_name: 'コクアロハ',
  company_desc:
    '居住者・投資家・旅行者のための現地密着コンシェルジュ／コーディネーション。',

  contact_title: 'お問い合わせ',
  contact_subtitle: '理想の滞在やお困りごとをお聞かせください',
  contact_name: 'お名前',
  contact_email: 'メールアドレス',
  contact_phone: '電話番号',
  contact_message: 'お問い合わせ内容',
  contact_send: '送信',

  footer_rights: 'All Rights Reserved.',
  footer_copyright: '© コクアロハ',
};

const translations: Record<Lang, Record<Keys, string>> = { en: { ...en }, ja };

/* i18n helper */
function useI18n(lang: Lang) {
  return useMemo(() => {
    const dict = translations[lang];
    const t = (k: Keys) => dict[k];
    return { t, dict };
  }, [lang]);
}

/* =====================================================
   コンポーネント
===================================================== */
export default function App() {
  const [lang, setLang] = useState<Lang>('ja');
  const { t } = useI18n(lang);
  const isJa = lang === 'ja';

  // fade-in on scroll
  const ioRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-in-section');
    ioRef.current?.disconnect();
    ioRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.12 }
    );
    els.forEach((el) => ioRef.current?.observe(el));
    return () => ioRef.current?.disconnect();
  }, []);

  // constants (colors)
  const gold = '#d4af37';
  const onyx = '#050607';
  const charcoal = '#0c0d0e';
  const graphite = '#141516';
  const cardBg = '#17181a';
  const borderGold = 'rgba(212,175,55,.28)';

  return (
    <div className="min-h-screen">
      {/* ===== Header ===== */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', borderColor: 'rgba(212,175,55,.15)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-serif text-xl" style={{ color: gold }}>{t('brand')}</div>

          <nav className="hidden md:flex gap-6 text-sm">
            <a className="hover:opacity-90 transition" style={{ color: '#e6e4df' }} href="#service">{t('nav_service')}</a>
<|diff_marker|> ADD A1020
            <a className="hover:opacity-90 transition" style={{ color: '#e6e4df' }} href="#about">{t('nav_about')}</a>
            <a className="hover:opacity-90 transition" style={{ color: '#e6e4df' }} href="#greeting">{t('nav_greeting')}</a>
            <a className="hover:opacity-90 transition" style={{ color: '#e6e4df' }} href="#company">{t('nav_company')}</a>
            <a className="hover:opacity-90 transition" style={{ color: '#e6e4df' }} href="#contact">{t('nav_contact')}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded text-sm border"
              style={{
                borderColor: lang === 'ja' ? gold : 'rgba(212,175,55,.35)',
                color: lang === 'ja' ? '#0b0b0c' : '#e6e4df',
                background: lang === 'ja' ? gold : 'transparent',
              }}
              onClick={() => setLang('ja')}
            >
              日本語
            </button>
            <button
              className="px-3 py-1 rounded text-sm border"
<|diff_marker|> ADD A1040
              style={{
                borderColor: lang === 'en' ? gold : 'rgba(212,175,55,.35)',
                color: lang === 'en' ? '#0b0b0c' : '#e6e4df',
                background: lang === 'en' ? gold : 'transparent',
              }}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative hero-full w-full overflow-hidden" style={{ background: onyx }}>
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
<|diff_marker|> ADD A1060
          fetchPriority="high"
        />
        {/* 黒フィルター＋上淡/下濃グラデ */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.75) 100%)',
          }}
        />
        {/* 内容 */}
        <div className="relative z-10 h-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          {/* “WELCOME TO” は非表示のまま */}
          <p className="hidden uppercase tracking-[0.35em] text-xs md:text-sm mb-4" style={{ color: gold }}>
            WELCOME TO
          </p>

          <h1
            className="hero-text-animation font-serif drop-shadow text-center"
            style={{
              color: '#fff',
<|diff_marker|> ADD A1080
              // 流体タイポ：端末幅に合わせてスムーズに可変
              fontSize: isJa ? 'clamp(28px, 8vw, 56px)' : 'clamp(26px, 6.8vw, 52px)',
              lineHeight: isJa ? 1.28 : 1.2,
              maxWidth: 'min(92vw, 720px)',
              margin: '0 auto',
              whiteSpace: 'normal',
              // バランスよく改行（対応ブラウザのみ）
              textWrap: 'balance' as any,
            }}
          >
            {isJa ? (
              <>
                <span>ハワイで出会う</span>
                <br />
                <span>新しい自分、</span>
                <br />
                <span>忘れていた日本の素晴らしさ。</span>
              </>
            ) : (
              <>
<|diff_marker|> ADD A1100
                {t('hero_title_line1')}
                <br />
                {t('hero_title_line2')}
              </>
            )}
          </h1>

          <a
            href="#service"
            className="mt-8 md:mt-10 inline-block rounded-xl px-7 py-3 text-sm font-semibold transition"
            style={{ background: gold, color: onyx, boxShadow: '0 6px 18px rgba(212,175,55,.25)' }}
          >
            {lang === 'ja' ? '詳しく見る' : 'LEARN MORE'}
          </a>
        </div>
        <div className="scroll-down" aria-hidden="true" />
      </section>

      {/* ===== About ===== */}
      <div className="w-full" style={{ background: charcoal }}>
<|diff_marker|> ADD A1120
        <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-20 fade-in-section">
          {/* 見出し・区切り線（中央） */}
          <h2 className="font-serif text-[28px] sm:text-3xl md:text-4xl mb-2 text-center" style={{ color: '#fff' }}>
            {t('about_title')}
          </h2>
          <div className="w-12 sm:w-14 h-0.5 mx-auto mb-6 sm:mb-8" style={{ background: gold }} />

          {/* 2カラム：左テキスト / 右ポイント */}
          <div className="grid md:grid-cols-[1.4fr_1.1fr] gap-10 md:gap-12 items-start">
            {/* 左：長文 */}
            <div>
              <p className="text-sm md:text-base leading-relaxed mb-4 opacity-90" style={{ color: '#e6e4df' }}>
                {t('about_desc')}
              </p>
              <div
                className="text-[15px] md:text-base leading-8 opacity-90 space-y-4"
                style={
                  isJa
                    ? ({
                        lineBreak: 'strict' as any,
<|diff_marker|> ADD A1140
                        hangingPunctuation: 'allow-end' as any,
                        letterSpacing: '0.002em',
                      } as any)
                    : {}
                }
              >
                {t('about_desc_long')
                  .split(/\n{2,}/)
                  .map((p, i) => (
                    <p key={i}>{p.trim()}</p>
                  ))}
              </div>
            </div>

            {/* 右：ポイントカード */}
            <div className="space-y-4">
              <div
                className="rounded-xl border p-5"
                style={{ background: cardBg, borderColor: borderGold, color: '#e6e4df' }}
              >
<|diff_marker|> ADD A1160
                <h3 className="font-serif text-lg mb-3" style={{ color: '#fff' }}>
                  {lang === 'ja' ? '私たちが大切にしていること' : 'What We Value'}
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li>・ローカルの専門家と連携した、実務に強いサポート</li>
                  <li>・「日本人だけの世界」に閉じない、本当のハワイとの出会い</li>
                  <li>・お客様の背景に寄り添う、オーダーメイドのご提案</li>
                  <li>・個人ではなく「組織」としての継続性と責任</li>
                </ul>
              </div>

              <div
                className="rounded-xl border p-5 text-sm leading-relaxed opacity-90"
                style={{ background: 'rgba(4,7,10,.8)', borderColor: 'rgba(212,175,55,.18)', color: '#e0dfd8' }}
              >
                {lang === 'ja' ? (
                  <>
                    <p className="mb-2">
                      ハワイでの生活・留学・投資・長期滞在など、「少し相談してみたい」という段階からお気軽にご連絡ください。
                    </p>
<|diff_marker|> ADD A1180
                    <p>小さなお困りごとの相談窓口としても、ご利用いただけます。</p>
                  </>
                ) : (
                  <>
                    <p className="mb-2">
                      Whether you are considering study, investment, long stays, or a first visit to Hawaii, we are here
                      from the “just exploring” stage.
                    </p>
                    <p>Think of us as your local, bilingual help desk in Hawaii.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== Founder Greeting ===== */}
      <div className="w-full" style={{ background: graphite }}>
        <section id="greeting" className="mx-auto max-w-6xl px-4 py-16 md:py-20 fade-in-section">
<|diff_marker|> ADD A1200
          <h2 className="font-serif text-[28px] sm:text-3xl md:text-4xl mb-2 text-center" style={{ color: '#fff' }}>
            {t('greeting_title')}
          </h2>
          <div className="w-12 sm:w-14 h-0.5 mx-auto mb-6 sm:mb-8" style={{ background: gold }} />

          <div className="max-w-3xl mx-auto">
            <p className="text-sm opacity-80 mb-3 text-center" style={{ color: gold }}>
              {t('greeting_name')}
            </p>
            <div
              className="space-y-5 text-[15px] md:text-base leading-8"
              style={
                isJa
                  ? ({
                      lineBreak: 'strict' as any,
                      hangingPunctuation: 'allow-end' as any,
                      letterSpacing: '0.002em',
                    } as any)
                  : {}
              }
<|diff_marker|> ADD A1220
            >
              {t('greeting_body_long')
                .split(/\n{2,}/)
                .map((p, i) => (
                  <p key={i}>{p.trim()}</p>
                ))}
            </div>
          </div>
        </section>
      </div>

      {/* ===== Service ===== */}
      <div className="w-full" style={{ background: charcoal }}>
        <section id="service" className="mx-auto max-w-6xl px-4 py-16 md:py-20 fade-in-section">
          <h2 className="font-serif text-[28px] sm:text-3xl md:text-4xl mb-2 text-center" style={{ color: '#fff' }}>
            {t('service_title')}
          </h2>
          <div className="w-12 sm:w-14 h-0.5 mx-auto mb-5 sm:mb-6" style={{ background: gold }} />
          <p className="text-sm opacity-90 mb-6 sm:mb-8 text-center">{t('service_subtitle')}</p>

<|diff_marker|> ADD A1240
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[
              ['svc1_title', 'svc1_desc'],
              ['svc2_title', 'svc2_desc'],
              ['svc3_title', 'svc3_desc'],
              ['svc4_title', 'svc4_desc'],
              ['svc5_title', 'svc5_desc'],
              ['svc6_title', 'svc6_desc'],
            ].map(([ti, de]) => (
              <article
                key={ti}
                className="rounded-xl p-5 md:p-6 border"
                style={{ background: cardBg, borderColor: 'rgba(212,175,55,.18)' }}
              >
                <h3 className="font-serif text-lg md:text-xl mb-2" style={{ color: '#fff' }}>
                  {t(ti as Keys)}
                </h3>
                <p className="text-sm leading-6 opacity-90">{t(de as Keys)}</p>
              </article>
            ))}
<|diff_marker|> ADD A1260
          </div>

          <p className="text-sm opacity-90 mt-6 text-center">{t('service_note_more')}</p>
        </section>
      </div>

      {/* ===== Company ===== */}
      <div className="w-full" style={{ background: graphite }}>
        <section id="company" className="mx-auto max-w-6xl px-4 py-16 md:py-20 fade-in-section">
          <h2 className="font-serif text-[28px] sm:text-3xl md:text-4xl mb-2 text-center" style={{ color: '#fff' }}>
            {t('company_title')}
          </h2>
          <div className="w-12 sm:w-14 h-0.5 mx-auto mb-5 sm:mb-6" style={{ background: gold }} />
          <div
            className="rounded-xl p-5 md:p-6 border max-w-3xl mx-auto"
            style={{ background: cardBg, borderColor: 'rgba(212,175,55,.18)' }}
          >
            <p className="font-serif text-lg md:text-xl mb-2 text-center" style={{ color: '#fff' }}>
              {t('company_name')}
            </p>
<|diff_marker|> ADD A1280
            <p className="leading-7 opacity-90 text-center">{t('company_desc')}</p>
          </div>
        </section>
      </div>

      {/* ===== Contact ===== */}
      <div className="w-full" style={{ background: charcoal }}>
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-20 fade-in-section">
          <h2 className="font-serif text-[28px] sm:text-3xl md:text-4xl mb-2 text-center" style={{ color: '#fff' }}>
            {t('contact_title')}
          </h2>
          <div className="w-12 sm:w-14 h-0.5 mx-auto mb-6 sm:mb-8" style={{ background: gold }} />
          <p className="text-sm opacity-90 mb-8 text-center">{t('contact_subtitle')}</p>

          <form
            className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks! (temporary)');
            }}
<|diff_marker|> ADD A1300
          >
            <div className="grid gap-2">
              <label className="text-sm opacity-90">{t('contact_name')}</label>
              <input
                className="rounded-lg border px-3 py-3"
                style={{ background: '#0f1011', borderColor: 'rgba(212,175,55,.22)' }}
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm opacity-90">{t('contact_email')}</label>
              <input
                type="email"
                className="rounded-lg border px-3 py-3"
                style={{ background: '#0f1011', borderColor: 'rgba(212,175,55,.22)' }}
                required
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm opacity-90">{t('contact_phone')}</label>
<|diff_marker|> ADD A1320
              <input
                className="rounded-lg border px-3 py-3"
                style={{ background: '#0f1011', borderColor: 'rgba(212,175,55,.22)' }}
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm opacity-90">{t('contact_message')}</label>
              <textarea
                className="rounded-lg border px-3 py-3 min-h-[120px]"
                style={{ background: '#0f1011', borderColor: 'rgba(212,175,55,.22)' }}
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl text-sm font-semibold"
                style={{ background: gold, color: onyx, boxShadow: '0 6px 18px rgba(212,175,55,.25)' }}
              >
                {t('contact_send')}
<|diff_marker|> ADD A1340
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* ===== Footer ===== */}
      <footer className="border-t" style={{ borderColor: 'rgba(212,175,55,.25)', background: '#050607' }}>
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs opacity-70" style={{ color: '#b8b7b0' }}>
            {t('footer_copyright')} &nbsp; {t('footer_rights')}
          </div>
          <div className="text-xs opacity-80" style={{ color: '#b8b7b0' }}>
            {lang === 'ja'
              ? '※ 本サイトはコンセプト紹介用のデモページです。'
              : 'Demo page for concept and branding only.'}
          </div>
        </div>
      </footer>
    </div>
<|diff_marker|> ADD A1360
  );
}
