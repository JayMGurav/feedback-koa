const title =
  'funfeedback';
const description = 'funfeedback is the easiest way to add comments, provide feedback, collect issues, ideas or reviews to your static site.';

const SEO = {
  title,
  description,
  canonical: 'https://feedbackkoa.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://feedbackkoa.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://feedbackkoa.vercel.app/og.png',
        alt: title,
        width: 500,
        height: 500
      }
    ]
  }
};

export default SEO;