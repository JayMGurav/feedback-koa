const title =
  'koafeedback';
const description = 'koafeedback is the easiest way to add comments, provide feedback, collect issues, ideas or reviews to your static site.';

const SEO = {
  title,
  description,
  canonical: 'https://koafeedback.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://koafeedback.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://koafeedback.vercel.app/og.png',
        alt: title,
        width: 500,
        height: 500
      }
    ]
  }
};

export default SEO;