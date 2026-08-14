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

  return { emitToShell }
}