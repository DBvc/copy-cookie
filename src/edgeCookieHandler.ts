import puppeteer from 'puppeteer-core'

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'

const getCookies = async (domain: string, key: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
  })
  const page = await browser.newPage()
  await page.goto(domain)
  const cookies = await page.cookies()
  const cookieValue = cookies.find((cookie) => cookie.name === key)?.value
  await browser.close()
  return cookieValue
}

const setCookies = async (domain: string, key: string, value: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
  })
  const page = await browser.newPage()
  await page.goto(domain)
  await page.setCookie({ name: key, value, domain })
  await browser.close()
}

export { getCookies, setCookies }
