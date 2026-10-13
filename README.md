# romscribe-runs

A Claude Code mod that shows the progress of a romscribe explain run in the status line:

```
rep-plain · apple2-deadtest 8/23 ~6m left
```

Every 15 seconds it reads the newest `*.log` in the logs folder and keeps only the run name, the ROM,
the count and the time left. The model's answers and the reference names in the log are never shown,
so blind judging stays blind. The entry clears when the log has not changed for 10 minutes.

## Install

```
/plugin install romscribe-runs --marketplace danielboston38/romscribe-runs
```

Answer `y` to add the marketplace, then pick a scope.

## Setting

`logs`: the folder of run logs, absolute or relative to the session's working directory.
Default `runs/explain/logs`, which is right for a session started in the romscribe checkout.

## Limits

A run that stalls for more than 10 minutes disappears from the status line as if it had finished.
