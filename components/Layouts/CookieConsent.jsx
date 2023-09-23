import CookieConsent from 'react-cookie-consent'

function index() {
  return (
    <CookieConsent
      cookieName="StockFinder_CookieConsent"
      buttonText="Comprendo"
      expires={30}
      location="bottom"
      buttonStyle={{ borderRadius: '6px' }}
      style={{}}
      buttonClasses="btn btn-primary"
      containerClasses="alert alert-warning items-center text-center sm:text-left justify-center sm:justify-left"
    >
      <div className="grid -mb-4 sm:-mb-0">
        <span className="text-lg font-semibold -mt-2">Privacidad</span>
        <div className="grid">
          <span className="text-sm">
            Esta web hace uso de cookies para mejorar la experiencia de usuario.
          </span>
          <span className="text-xxs italic">
            Las cookies no se utilizan para anuncios, tampoco se almacenan en el
            servidor.
          </span>
        </div>
      </div>
    </CookieConsent>
  )
}

export default index
