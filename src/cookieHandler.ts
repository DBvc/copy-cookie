import * as chromeCookieHandler from './chromeCookieHandler'
import * as edgeCookieHandler from './edgeCookieHandler'

const copyCookies = async (sourceDomain: string, targetDomain: string, browserType: string, key: string) => {
  const handler = new Map([
    [
      'chrome',
      {
        getCookies: chromeCookieHandler.getCookies,
        setCookies: chromeCookieHandler.setCookies,
      },
    ],
    [
      'edge',
      {
        getCookies: edgeCookieHandler.getCookies,
        setCookies: edgeCookieHandler.setCookies,
      },
    ],
  ])

  if (!handler.has(browserType)) {
    return {
      success: false,
      message: 'Browser type not supported',
    }
  }

  const { getCookies, setCookies } = handler.get(browserType)!
  const cookieValue = await getCookies(sourceDomain, key)
  if (!cookieValue) {
    return {
      success: false,
      message: 'Cookie not found',
    }
  }

  try {
    await setCookies(targetDomain, key, cookieValue)
  } catch (error) {
    return {
      success: false,
      message: (error as any).message,
    }
  }

  return {
    success: true,
    message: 'Cookie copied successfully',
  }
}

export { copyCookies }
