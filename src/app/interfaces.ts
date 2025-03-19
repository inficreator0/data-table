export interface Leads {
  id: number
  name: string
  email: string
  lastContacted: string | null
  engaged: boolean
  company: string
  stage: number
}
