const SHELL_TARGET_ORIGIN = import.meta.env.VITE_SHELL_ORIGIN || '*'

export function useShellEvents() {
  function emitToShell(type, detail) {
    if (window.parent === window) return

    window.parent.postMessage(
      {
        source: 'catalog',
        type,
        detail
      },
      SHELL_TARGET_ORIGIN
    )
  }

  function listenToShell(type, callback) {
    function handleMessage(event) {
      const message = event.data

      if (
        message?.source === 'shell' &&
        message.type === type
      ) {
        callback(message.detail)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }

  return { emitToShell, listenToShell }
}