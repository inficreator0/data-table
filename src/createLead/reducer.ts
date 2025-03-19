export const INITIAL_STATE = {
  name: '',
  email: '',
  company: '',
  lastContacted: '',
  stage: 0,
  engaged: false,
  id: -1,
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return INITIAL_STATE
    case 'SET_INITIAL_STATE':
      return { ...state, ...action.value }
    default:
      return state
  }
}
