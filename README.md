# code-run

A Claude Code mod that shows the progress of a long-running job in the status line:

```
rep-plain · apple2-deadtest 8/23 ~6m left
```

Every 15 seconds it reads the newest `*.log` in the logs folder and finds the last progress line of the
form `[8/23  35%  ~6m left] <name> ...`. It shows the log's name, the item's name, the count and the time
left, and nothing else from the line, so a job's output (model answers, reference text) stays out of view.
The entry clears when the log has not changed for 10 minutes.

## Install

```
/plugin install code-run --marketplace danielboston38/code-run
```

Answer `y` to add the marketplace, then pick a scope.

## Setting

`logs`: the folder of job logs, absolute or relative to the session's working directory.
Default `runs/explain/logs`.

## Limits

A job that stalls for more than 10 minutes disappears from the status line as if it had finished.
