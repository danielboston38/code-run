import type { Register } from 'claude-code'

// "[8/23  35%  ~6m left] apple2-deadtest $FE8A <name> ref: <key>": keep the count and the ROM only,
// never the model's name or the key, so judging stays blind.
const PROGRESS = /\[(\d+)\/(\d+)\s+\d+%\s+([^\]]*)\]\s+(\S+)/g

export function progress(run: string, log: string): string | undefined {
  const last = [...log.matchAll(PROGRESS)].at(-1)
  if (!last) return undefined
  const [, done, total, left, rom] = last
  return `${run} · ${rom} ${done}/${total} ${left}`
}

export const register: Register = (on, options) => {
  const LOGS = String(options.logs ?? 'runs/explain/logs')
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const tick = async () => {
      const logs = await $.fs.list(LOGS).catch(() => [])
      const newest = logs.filter(f => f.name.endsWith('.log')).sort((a, b) => b.mtimeMs - a.mtimeMs)[0]
      // shortcut: a log untouched for 10 minutes counts as finished; a run that stalls longer than that disappears too.
      const isLive = newest !== undefined && (await $.clock.now()) - newest.mtimeMs < 10 * 60_000
      const text = isLive ? await $.fs.read(`${LOGS}/${newest.name}`).catch(() => '') : ''
      $.ui.status(isLive ? progress(newest.name.replace(/\.log$/, ''), text) : undefined)
    }
    await tick()
    $.clock.every(15_000, tick)
    return result
  })
}
