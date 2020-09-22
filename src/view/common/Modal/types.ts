export type ModalType = {
  isVisible: boolean, 
  setVisibility: React.EventHandler<any>, 
  children?: React.ReactNode,
  title: string
}