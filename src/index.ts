import { parseArgs } from './utils'
import { copyCookies } from './cookieHandler'

const main = async () => {
  const args = parseArgs()
  const { sourceDomain, targetDomain, browserType, key } = args
  const { success, message } = await copyCookies(sourceDomain, targetDomain, browserType, key)
  if (!success) {
    console.error(message)
    process.exit(1)
  }
}

main()