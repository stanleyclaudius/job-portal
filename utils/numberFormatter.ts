export const toIDRCurrency = (amount: number) => {
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  return formatter.format(amount).toString().slice(0, -3)
}