const INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
  BLUE = 'BLUE';

export default function SmallCustomPill({ textToShow, type, property }: { textToShow: string; type: string; property?: string }) {
  const tempValue = property ? property : ''
  const baseClassName = 'inline-block px-1 rounded-full text-xxs lg:text-xs outline outline-1 ' + tempValue
  switch (type) {
    case BLUE:
      return <span className={baseClassName + " bg-blue-500 text-info outline-info"}>{textToShow}</span>
    case INFO:
      return <span className={baseClassName + " bg-info-light text-info outline-info"}>{textToShow}</span>
    case SUCCESS:
      return <span className={baseClassName + " bg-success-light text-success outline-success"}>{textToShow}</span>
    case ERROR:
      return <span className={baseClassName + " bg-error-light text-error outline-error"}>{textToShow}</span>
    default:
      return <span className={baseClassName + " bg-warning-light text-black outline-warning"}>{textToShow}</span>
  }
}
