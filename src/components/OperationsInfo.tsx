import { useLanguage } from '../i18n/LanguageContext'
import './OperationsInfo.css'

export default function OperationsInfo() {
  const { t } = useLanguage()
  const o = t.operations

  return (
    <div className="operations-info">
      <p className="operations-info__row">
        <strong>{o.manufacturingBase}</strong>
        <span>{o.manufacturingCountry}</span>
      </p>
      <p className="operations-info__row">
        <strong>{o.intlSalesOffice}</strong>
        <span>{o.intlSalesCountry}</span>
      </p>
      <p className="operations-info__desc">{o.description}</p>
    </div>
  )
}
