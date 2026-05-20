import { useCallback, useEffect, useRef } from 'react'
import type { WsMessage } from '../types'

export function useWebSocket(
  url: string,
  onMessage: (msg: WsMessage) => void,
): (data: object) => void {
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  const connect = useCallback(() => {
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onmessage = (evt: MessageEvent<string>) =>
      onMessageRef.current(JSON.parse(evt.data) as WsMessage)
    ws.onclose = () => {
      reconnectRef.current = setTimeout(connect, 3000)
    }
    ws.onerror = () => ws.close()
  }, [url])

  useEffect(() => {
    connect()
    return () => {
      if (reconnectRef.current !== null) clearTimeout(reconnectRef.current)
      const ws = wsRef.current
      if (ws) {
        ws.onmessage = null
        ws.onclose = null
        ws.onerror = null
        ws.close()
      }
    }
  }, [connect])

  return useCallback((data: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [])
}
