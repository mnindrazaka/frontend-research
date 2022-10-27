import Document, { Main, Head, NextScript, Html } from 'next/document';

const FacebookPixelScript = (props: { fbPixelId: string }) => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${props.fbPixelId}'); 
                fbq('track', 'PageView');
                `,
      }}
    />
    <noscript>
      <img
        height="1"
        width="1"
        src={`https://www.facebook.com/tr?id=${props.fbPixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  </>
);

const GtmScript = (props: { gtmId: string }) => (
  <>
    <script dangerouslySetInnerHTML={{ __html: 'dataLayer = []' }}></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${props.gtmId}');`,
      }}
    />
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${props.gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  </>
);

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Rubik:500|Source+Sans+Pro:400,600,700,900|Montserrat:400,600,700,900&display=swap"
            type="text/css"
            crossOrigin="true"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <FacebookPixelScript fbPixelId="" />
          <GtmScript gtmId="" />
        </body>
      </Html>
    );
  }
}
