/** Official Telegram logo mark */
export default function TelegramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.169.896-.634 1.183-1.269.727l-3.51-2.59-1.692 1.63c-.184.184-.338.338-.69.338l.244-3.62 6.522-5.89c.284-.253-.061-.394-.437-.141l-8.05 5.07-3.472-1.085c-.753-.235-.768-.753.157-1.115l13.55-5.222c.627-.235 1.176.15.973 1.09z" />
    </svg>
  )
}
