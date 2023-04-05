import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface ParsedArgs {
  sourceDomain: string
  targetDomain: string
  browserType: string
  key: string
}

const parseArgs = (): ParsedArgs => {
  const argv = yargs(hideBin(process.argv))
    .options({
      'source-domain': { type: 'string', demandOption: true, description: 'Source domain' },
      'target-domain': { type: 'string', demandOption: true, description: 'Target domain' },
      'browser-type': { type: 'string', demandOption: true, description: 'Browser type' },
      key: { type: 'string', demandOption: true, description: 'Cookie key' },
    })
    .parseSync()


  const sourceDomain = argv['source-domain']
  const targetDomain = argv['target-domain']
  const browserType = argv['browser-type']
  const key = argv['key']

  return {
    sourceDomain,
    targetDomain,
    browserType,
    key,
  }
}

export { parseArgs }

