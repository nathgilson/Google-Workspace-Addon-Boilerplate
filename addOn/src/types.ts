export interface AppState {
  user: any
  spreadsheetId: string | null
  warning: string | null
}
export interface GAEvent {
  category: string
  action: string
  label?: string
}
