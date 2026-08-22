# SpeakO SEO Indexation Map

## Production rules

- Index public English and Chinese landing pages that serve a clear search intent.
- Use one canonical URL per page.
- Do not index duplicate, development, staging, or utility pages.
- Keep canonical URLs absolute after the final production domain is selected.
- Do not use robots.txt as a substitute for canonicalization.

## Index these pages

| URL | Language | Primary intent | Index | Canonical |
|---|---|---|---|---|
| `/` or `/index.html` | en | 1-to-1 online English classes for Chinese students | Yes | Production homepage |
| `/zh.html` | zh-CN | 在线一对一英语 / 中国学生在线英语 | Yes | Chinese landing page |
| `/about.html` | en | About SpeakO | Yes | Self |
| `/course.html` | en | Online English courses | Yes | Self |
| `/course-everyday.html` | en | Everyday English & conversation | Yes | Self |
| `/course-speaking.html` | en | English speaking & confidence | Yes | Self |
| `/course-beginners.html` | en | English for beginners | Yes | Self |
| `/course-business.html` | en | Business English | Yes | Self |
| `/course-ielts.html` | en | IELTS preparation | Yes | Self |
| `/course-kids.html` | en | English for kids | Yes | Self |
| `/team.html` | en | English teachers | Yes | Self |
| `/teachers/shah.html` | en | Advanced English teacher | Yes | Self |
| `/teachers/nomi.html` | en | Advanced English teacher | Yes | Self |
| `/teachers/faizan.html` | en | Kids and beginner English teacher | Yes | Self |
| `/teachers/umer.html` | en | Kids and beginner English teacher | Yes | Self |
| `/teachers/sakib.html` | en | Kids and beginner English teacher | Yes | Self |
| `/teachers/dua.html` | en | PhD English / advanced academic teacher | Yes | Self |
| `/pricing.html` | en | SpeakO pricing | Yes | Self |
| `/faq.html` | en | SpeakO FAQ | Yes | Self |
| `/contact.html` | en | Contact / ¥20 trial booking | Yes | Self |

## Do not intentionally index

- `.git/`
- `.github/`
- development/staging copies
- duplicate template pages with no unique SpeakO search intent
- temporary test files

## Canonical strategy

Each indexable HTML page should contain exactly one canonical link. Until the final domain is purchased, existing relative canonicals should be treated as temporary. Before production launch, convert them to absolute HTTPS URLs on the final domain.

Example:

```html
<link rel="canonical" href="https://FINAL-DOMAIN.example/course.html">
```

## Language strategy

`/index.html` is the English version and `/zh.html` is the Chinese landing page. Once the final domain exists, add reciprocal `hreflang` tags using absolute HTTPS URLs:

```html
<link rel="alternate" hreflang="en" href="https://FINAL-DOMAIN.example/">
<link rel="alternate" hreflang="zh-CN" href="https://FINAL-DOMAIN.example/zh.html">
<link rel="alternate" hreflang="x-default" href="https://FINAL-DOMAIN.example/">
```

Do not add invented domain URLs before the domain is selected.

## Launch checklist

- [ ] Replace `YOUR-DOMAIN.example` in `sitemap.xml` with final domain.
- [ ] Add final-domain Sitemap directive to `robots.txt`.
- [ ] Convert all relative canonicals to absolute HTTPS URLs.
- [ ] Add reciprocal `hreflang` to English/Chinese equivalents.
- [ ] Verify every sitemap URL returns HTTP 200.
- [ ] Submit sitemap in Google Search Console.
- [ ] Submit sitemap in Bing Webmaster Tools.
- [ ] Test canonical and hreflang after deployment.
